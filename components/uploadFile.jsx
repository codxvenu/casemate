"use client";
import { React, useContext, useEffect, useState } from "react";
import { Upload, FolderPlus, X, FileSpreadsheet } from "lucide-react";
import { User } from "@/app/context/UserContext";
import Loader from "./loader";
import { toast } from "react-toastify";
import { FileService } from "@/hook/apifetch";
import { geist, inter } from "@/app/layout";
import { handleSize } from "@/utility/lib/files";
const UploadFile = ({
  handleCreateDir,
  setUploadShow,
  handleFiles,
  CurrentPath,
  files,
}) => {
  const [isDragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(User);
  const [fileList, setFileList] = useState([]);

  function CheckExits(upload) {
    if (!upload || !user) return;
    return !!files?.find((i) => i?.name === upload?.name);
  }
  function CreateFileObject(upload) {
    const fileObj = {
      name: upload.name,
      size: upload.size,
      type: upload.type,
    };
    setFileList((prev) => [...prev, { ...fileObj, status: "Uploading..." }]);
    return fileObj;
  }
  function CreateFormData(upload) {
    const formData = new FormData();
    const now = new Date().toISOString();
    formData.append("time", now);
    formData.append("userId", user.id);
    formData.append("fpath", CurrentPath());
    formData.append("file", upload);
    return formData;
  }
  async function handleUpload(files) {

    const upload = Array.from(files);
    if (!Array.isArray(upload)) return;

    const duplicates = upload.filter((i) => CheckExits(i));
    if (duplicates.length > 0)
       toast.error(`Duplicate ${duplicates.map((i) => i.name).join(",")}`);

    const FilteredFile = upload.filter((i) => !CheckExits(i));
    const result = await Promise.allSettled(
      FilteredFile.map((file) => {

        const Fileobj = CreateFileObject(file);
        return FileService.addFile(CreateFormData(file))
          .then((res) => ({ res, file: Fileobj }))
          .catch((err) => Promise.reject({ err, file: Fileobj }));
      })
    );
    setFileList((prev) =>
      prev.map((i) => {
        const fn = result.find(
          (file) => i?.name === file?.value?.file?.name || file?.reason?.file?.name);
          
        return fn
          ? fn.status === "fulfilled"
            ? { ...i, status: "Completed" }
            : { ...i, status: "Failed",error : fn?.reason?.err }
          : i;
      })
    );
    handleFiles();
  }

function UFiles(key, file) {
    return (
      <div
        key={key}
        className={`${geist.className} p-2.5 rounded-md bg-gray-50 flex justify-between relative`}
      >
        <div className="flex items-center justify-start gap-2">
          <span className="shadow-md rounded-md p-2.5 bg-white">
            <FileSpreadsheet className="w-5 h-5 text-blue-500" />{" "}
          </span>
          <span className="flex flex-col items-start justify-start">
            <small className="font-medium !text-[12px]">{file?.name}</small>
            <small className="text-[var(--muted-forground)] !text-[12px]">
              {handleSize(file?.size)}
            </small>
          </span>
          {/* <div className="w-[80%] h-0.5 bg-blue-400 absolute bottom-0 left-0 rounded-md"></div> */}
        </div>
        <span className="flex flex-col justify-between items-end">
          <X className="w-4 h-4 text-[var(--muted-forground)] hover:text-[var(--text)]" onClick={()=>setFileList((prev)=>prev.filter((i)=>i?.name !== file?.name))}/>
          <small className={`text-[var(--muted-forground)] !text-[12px] relative group ${file?.status === "Completed" && "text-green-600"} ${file?.status === "Failed" && "text-red-600"}`}>
            {file?.status}
            <small className="absolute top-4 !text-[11px] left-4 bg-black text-white p-1 px-2 group-hover:block hidden w-max h-max">{file?.error?.message}</small>
          </small>
        </span>
      </div>
    );
  }
  return (
    <div
      onDrop={(e) => {
        e.preventDefault();
        handleUpload(e.dataTransfer.files);
        setDragging(false);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        console.log("dragover");
        setDragging(false);
      }}
      className={`fixed top-0 backdrop-blur-[2px] w-full left-0 h-screen flex flex-col items-center justify-center bg-[rgba(0,0,0,0.4)]`}
    >
      <div className="p-4 bg-white rounded-md">
        <h2 className="font-medium">File Upload</h2>
        <span
          className={`flex items-center justify-center gap-2 p-7 py-12 border-[1px] rounded-md border-gray-300 border-dashed mt-2 transition-all duration-300 ${
            isDragging && "opacity-65"
          } `}
        >
          <Upload className="w-5 h-5 text-[var(--muted-forground)]" />
          <h3 className={`!font-light text-[var(--muted-forground)]`}>
            Drag and drop or{" "}
            <span className=" hover:border-b-[1px] text-[var(--text)] !font-medium">
              <input
                type="file"
                className="w-19"
                multiple
                onChange={(e) => handleUpload(e.target.files)}
              />
            </span>{" "}
            to upload
          </h3>
        </span>
        <small className="block text-[11px] p-2 text-[var(--muted-forground)] mt-1">
          Recommended max. size: 10 MB, Accepted file types: XLSX, XLS, CSV.
        </small>
        <div className="pt-5 grid gap-2 max-h-[360px] overflow-y-scroll" style={{scrollbarWidth : "none"}}>
          {fileList?.map((file, index) => UFiles(index, file))}
        </div>
        <div className="flex items-center gap-3 justify-end mt-10 ">
          <button
            className="p-1.5 px-3 bg-white text-black shadow-neutral-300 shadow hover:drop-shadow-2xl rounded-md text-center capitalize text-sm"
            onClick={() => setUploadShow(false)}
          >
            Cancel
          </button>
          <button className="p-1.5 px-3 bg-blue-600 text-white shadow-2xl rounded-md text-center capitalize text-sm relative">
            <input
              type="file"
              className="w-full h-full opacity-0 absolute top-0 left-0"
              multiple
              onChange={(e) => handleUpload(e.target.files)}
            />
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadFile;
