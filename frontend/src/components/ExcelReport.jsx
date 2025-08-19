import axios from 'axios';
import React from 'react'

const ExcelReport = ({temp}) => {
  const serverUrl=import.meta.env.VITE_SERVER_URL;
  const handleDownloadReport=async()=>{
    try {
      const response = await axios.get(`${serverUrl}/api/reports/export/${temp}`, {
        responseType: 'blob', // important!
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      // Create a link to download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${temp}_report.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Download failed:', error);
      alert("Failed to download the report");
    }
  }

  return (
    <button className='bg-lime-200 px-2 py-1 rounded-md cursor-pointer text-sm' onClick={handleDownloadReport}>Download Report</button>
  )
}

export default ExcelReport