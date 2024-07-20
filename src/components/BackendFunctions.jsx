import ExcelJS from 'exceljs';
import { useState } from 'react';


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

export function xlsxToObjects (workbook) {
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
                book[key] = rowList[index];
            })
            books.push(book);
        }
    })
    console.log(books);
}


