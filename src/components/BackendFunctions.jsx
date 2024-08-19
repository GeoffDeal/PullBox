import ExcelJS from 'exceljs';
import { useState, useContext } from 'react';
import { ComicList } from '../Contexts';

export const categoryObj = { // Translate from category/sort column of excel
    HC: 'Hardcover',
    HCMR: 'Hardcover',
    OMNIBUS: 'Omnibus',
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
    console.log(workbook);
}

export function xlsxToObjects (workbook, publisher) {
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
        
            book.ProductType !== 'Remove' && books.push(book);
        }
    })
    
    console.log(books);
    const sorted = bookSort(books); //Temporary placement for sort until it can be done on backend
    console.log(sorted);


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