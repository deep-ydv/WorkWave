import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

const exportDataInExcel = async (tasks, fileName = 'tasks') => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Task List');

  // Add header row
  worksheet.columns = [
    { header: 'Title', key: 'title', width: 30 },
    { header: 'Description', key: 'description', width: 50 },
    { header: 'Priority', key: 'priority', width: 15 },
    { header: 'Due Date', key: 'dueDate', width: 20 },
  ];

  // Add rows
  tasks.forEach((task) => {
    worksheet.addRow({
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDate: new Date(task.dueDate).toLocaleDateString("en-IN"),
    });
  });

  // Add styles (optional)
  worksheet.getRow(1).font = { bold: true };
  worksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };

  // Create file
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });

  saveAs(blob, `${fileName}.xlsx`);
};
