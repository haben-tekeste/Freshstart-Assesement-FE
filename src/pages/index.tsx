import { FaPlus } from "react-icons/fa6";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import {Link} from 'react-router-dom'
import { useLazyGetReportQuery } from "@services/item";

function Home() {
  const [getReport, {isLoading, isError}] = useLazyGetReportQuery()
  const handleGenerateReport = async () => {
    try {
      const response = await getReport({}).unwrap();
      
      // Check if response is a blob
      if (!(response instanceof Blob)) {
        throw new Error('Response is not a Blob');
      }

      const url = window.URL.createObjectURL(new Blob([response], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'inventory_report.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Failed to download report:', error);
    }
  };
  return (
    <div className="flex items-center justify-center h-[90vh]">
      <div>
        <div className="flex flex-col justify-center items-center gap-6 bg-img py-8 px-4 rounded-xl">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-5xl font-bold text-white">Welcome to</h1>
            <h1 className="text-5xl font-bold text-white">Inventory</h1>
            <h1 className="text-5xl font-bold text-white">Management</h1>
          </div>
          <p className="text-center text-gray-400">
            You can add, edit and delete items. You can also generate <br />{" "}
            inventory reports
          </p>
          <button 
            className="bg-blue-500 px-4 py-3 rounded-xl font-bold text-white" 
            onClick={handleGenerateReport}
            disabled={isLoading}
          >
            {isLoading ? 'Generating...' : 'Generate Inventory Report'}
          </button>
          {isError && <p className="text-red-500">Failed to generate report.</p>}
        </div>
        <div className="mt-6 flex flex-col gap-4">
          <Link to="/add" className="flex gap-4 items-center cursor-pointer">
            <div className="py-3 px-3 border-1 bg-[#91a2b1] rounded-lg">
              <FaPlus size={25} color="white" />
            </div>
            <div>
              <h3 className="font-bold">Add Item</h3>
              <p className="text-gray-500">Add a new item</p>
            </div>
          </Link>
          <Link to='/edit' className="flex gap-4 items-center cursor-pointer">
            <div className="py-3 px-3 border-1 bg-[#91a2b1] rounded-lg">
              <MdModeEdit size={25} color="white" />
            </div>
            <div>
              <h3 className="font-bold">Edit Item</h3>
              <p className="text-gray-500">Edit an existing an item</p>
            </div>
          </Link>
          <Link to="/delete" className="flex gap-4 items-center cursor-pointer">
            <div className="py-3 px-3 border-1 bg-[#91a2b1] rounded-lg">
              <MdDelete size={25} color="white" />
            </div>
            <div>
              <h3 className="font-bold">Delete Item</h3>
              <p className="text-gray-500">Delete an existing item</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
