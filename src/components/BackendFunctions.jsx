import ExcelJS from 'exceljs';
import { useState } from 'react';

export const categoryObj = { // Translate from category/sort column of excel
    HC: 'Hardcover',
    HCMR: 'Hardcover',
    OMNIBUS: 'Hardcover',
    TP: 'Trade Paperback',
    TR: 'Trade Paperback',
    TRMR: 'Trade Paperback',
    COMICS: 'Comic',
    COMIC: 'Comic',
    CB: 'Comic',
    CBPM: 'Comic',
    BXS: 'Box Set',
    BXHC: 'Box Set',
    BXTR: 'Box Set',
    GN: 'Graphic Novel',
    PS: 'Poster',
    'Q.VARIANTS': 'Incentive',
    GC: 'Remove',
    CT: 'Remove',
    'OMNIBUS RE': 'Remove',
    'HC REPRINT': 'Remove', 
    'TP REPRINT': 'Remove', 
    '2ND PRINT': 'Remove', 
    PROMO: 'Remove',
    SALE: 'Remove', 
    STANDEE: 'Remove',
    MERCH: 'Remove',
    PLUSH: 'Remove',
    TAGS: 'Remove',
}

const handleImport = (event) => {
    event.preventDefault();

    const [workbook, setWorkbook] = useState();
    const getWorkbook = () => {
        const reader = new FileReader();
    
        reader.onload = async (e) => {
            const arrayBuffer = e.target.result;
            const workbook = new ExcelJS.Workbook();
            await workbook.xlsx.load(arrayBuffer);
            setWorkbook(workbook);
        }
        reader.readAsArrayBuffer(file);
    }
    const cleanSheet = () => {
        const moddedWorkbook = workbook;
        moddedWorkbook.removeSheet[1];
        moddedWorkbook.worksheets[0].splice(0, 1);
        setWorkbook(moddedWorkbook);
    }

    getWorkbook();
    cleanSheet();
}

export function xlsxToObjects (workbook, publisher) {
    const marvelPriceSwitch = {
        '$5.00': '$3.99',
        '$6.25': '$4.99',
        '$7.50': '$5.99',
        '$8.75': '$6.99',
        '$10.00': '$7.99',
        '$11.25': '$8.99',
        '$12.50': '$9.99',
    }
    const indiePriceSwitch ={
        '$5.29': '$3.99',
        '$6.99': '$4.99',
        '$7.99': '$5.99',
        '$9.50': '$6.99',
        '$10.99': '$7.99',
        '$11.99': '$8.99',
        '$12.99': '$9.99',
    }
    const books = [];
    const header = [];

    workbook.worksheets[0].getRow(1).eachCell((cell, column) => {
        header.push(cell.value);
    })

    workbook.worksheets[0].eachRow((row, rowNumber) => {
        if (rowNumber !== 1) {
            const rowList = [];
            row.eachCell((cell, column) => {
                const cellValue = cell.value;
                if (typeof cellValue === 'object') {
                    rowList.push(cellValue.text);
                }else {
                    rowList.push(cellValue);
                }
            })

            const book = {};
            header.forEach((key, index) => {
                const spacelessKey = key.replace(/\s+/g, '');
                book[spacelessKey] = rowList[index];
            })

            book.Issue = findNumber(book.ProductName);

            book.Publisher = publisher;

            const productType = book.Category || book.Sort;
            if (productType.includes('1:')) {
                book.ProductType = 'Incentive';
                book.Incentive = productType;
            } else{
                book.ProductType = categoryObj[productType];
            }

            if (book.Publisher === 'Marvel' && (book.ProductType ==='Comic' || book.ProductType === 'Incentive')) {
                book.MSRP = marvelPriceSwitch[book.MSRP] ? marvelPriceSwitch[book.MSRP] : book.MSRP;
            }
            if (book.Publisher === 'Idw' && (book.ProductType ==='Comic' || book.ProductType === 'Incentive')) {
                book.MSRP = indiePriceSwitch[book.MSRP] ? indiePriceSwitch[book.MSRP] : book.MSRP;
            }
        
            book.ProductType !== 'Remove' && books.push(book);
        }
    })
    
    const sorted = bookSort(books);

    return sorted;
}

export function doublesCheck (newBooks, oldBooks) {

    const newSkus = new Set(newBooks.map(book => book.Sku))
    const updatedList = oldBooks.filter(book => !newSkus.has(book.Sku))
    return updatedList;
}

export const findNumber = (title) => {
    let firstCut = title.indexOf('#');
    let cutTitle;
    if (firstCut === -1) {
        firstCut = title.indexOf('VOL.')
    }
    if (firstCut !== -1) { 
        cutTitle = title.slice(firstCut)
    }
    const number = cutTitle ? cutTitle.match(/\d+/) : null;
    const issueNumber = number ? number[0] : -1; // -1 for books without an issue or vol number, reserving 0 for the few books which use it

    return issueNumber;
}

export const bookSort = (bookArray) => {

    const currentDate = new Date();

    const newBooks = [];
    const oldBooks = [];
    bookArray.forEach((book) => {
        const releaseDate = new Date(book.Release)
        if (releaseDate > currentDate) {
            newBooks.push(book);
        } else {
            oldBooks.push(book);
        }
    })
    
    const beforeFoc =[];
    const afterFoc = [];
    newBooks.forEach((book) => {
        const focDate = new Date(book.FOCDueDate);
        if (focDate > currentDate) {
            afterFoc.push(book);
        }else {
            beforeFoc.push(book);
        }
    })
    
    afterFoc.sort((a, b) => {
        const dateComp = new Date(a.FOCDueDate) - new Date(b.FOCDueDate);
        if (dateComp === 0) {
            return a.Issue - b.Issue;
        }
        return dateComp;
    })
    beforeFoc.sort((a, b) => {
        const dateComp = new Date(b.FOCDueDate) - new Date(a.FOCDueDate);
        if (dateComp === 0) {
            return a.Issue - b.Issue;
        }
        return dateComp;
    })
    const sortedBooks = afterFoc.concat(beforeFoc).concat(oldBooks);
    return sortedBooks;
}