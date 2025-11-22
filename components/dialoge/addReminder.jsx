import React from "react";

const AddReminder = ({ handleReminder,setReminder, action }) => {
  const handleFormData = (e) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  return (
    <>
      <div className="fixed inset-0 bg-[rgba(0,0,0,0.3)] backdrop-blur-[2px] z-[999]"></div>
      <div
        className="bg-[var(--foreground)]  min-[420px]:w-[400px] w-[90vw] h-fit p-4 fixed top-1/2 left-1/2 
        -translate-x-1/2 -translate-y-1/2 shadow-sm rounded-md z-[1000]"
      >
        <h2 className="text-lg font-semibold">Add quick reminder</h2>
        <ul className="p-2 mt-2 flex flex-col gap-4">
          <li className="flex flex-col items-start gap-2">
            <h3 className="text-sm">Title</h3>
            <input
              type="text"
              placeholder="Title"
              name="title"
              className="px-3 py-2 shadow-sm w-full rounded"
              onChange={handleFormData}
            />
          </li>

          <li className="flex flex-col items-start gap-2">
            <h3 className="text-sm">Description</h3>
            <input
              type="text"
              name="Description"
              placeholder="description"
              className="px-3 py-2 shadow-sm w-full rounded"
              onChange={handleFormData}
            />
          </li>
          <li className="flex flex-col items-start gap-2">
            <h3 className="text-sm">Time</h3>
            <input type="date" name="time" className="px-3 py-2 shadow-sm w-full rounded" onChange={handleFormData}/>
          </li>
          <li className="grid grid-cols-2 items-center justify-between gap-2 mt-2">
            <button className="p-2 bg-[var(--text)] text-white w-full rounded-md" onClick={()=>setReminder(false)}>
              Cancel
            </button>
            <button
              className="p-2 bg-blue-600 text-white w-full rounded-md"
              onClick={() => handleReminder(formData, action)}
            >
              Submit
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default AddReminder;
