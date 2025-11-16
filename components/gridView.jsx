import React from "react";
import {
  TextAlignJustify,
  House,
  ChevronRight,
  Search,
  Grid,
  List,
  ArrowUpDown,
  Folder,
  Info,
  ChevronUp,
  FileSpreadsheet,
  EllipsisVertical,
  Download,
  Share2,
  Edit,
  Trash2,
  FileQuestionMark,
  Video,
  Music,
  FileText,
  Image as Imageicon,
  CloudUpload,
} from "lucide-react";
import { inter } from "@/app/layout";
const GridView = ({
  handleFileType,
  actions,
  handleSize,
  formatDate,
  DownloadFile,
  setClose,
}) => {
  const allFiles = [ {
            "fileId": 1,
            "filename": "photo_2024-09-21_15-39-39.jpg",
            "userId": 5,
            "type": "jpg",
            "uploadType": "default",
            "created_at": "2025-11-12T10:15:08.661Z",
            "shareId": null,
            "size": 43813,
            "path": "/5/photo_2024-09-21_15-39-39.jpg"
        },
        {
            "fileId": 8,
            "filename": "WhatsApp_Image_2025-11-16_at_12.18.31_AM.jpeg",
            "userId": 5,
            "type": "jpeg",
            "uploadType": "default",
            "created_at": "2025-11-15T19:20:21.725Z",
            "shareId": null,
            "size": 117607,
            "path": "/5/WhatsApp_Image_2025-11-16_at_12.18.31_AM.jpeg"
        },
        {
            "fileId": 9,
            "filename": "WhatsApp_Image_2025-11-16_at_1.02.51_AM.jpeg",
            "userId": 5,
            "type": "jpeg",
            "uploadType": "default",
            "created_at": "2025-11-15T19:33:43.871Z",
            "shareId": null,
            "size": 350067,
            "path": "/5/WhatsApp_Image_2025-11-16_at_1.02.51_AM.jpeg"
        }, {
            "fileId": 1,
            "filename": "photo_2024-09-21_15-39-39.jpg",
            "userId": 5,
            "type": "jpg",
            "uploadType": "default",
            "created_at": "2025-11-12T10:15:08.661Z",
            "shareId": null,
            "size": 43813,
            "path": "/5/photo_2024-09-21_15-39-39.jpg"
        },
        {
            "fileId": 8,
            "filename": "WhatsApp_Image_2025-11-16_at_12.18.31_AM.jpeg",
            "userId": 5,
            "type": "jpeg",
            "uploadType": "default",
            "created_at": "2025-11-15T19:20:21.725Z",
            "shareId": null,
            "size": 117607,
            "path": "/5/WhatsApp_Image_2025-11-16_at_12.18.31_AM.jpeg"
        },
        {
            "fileId": 9,
            "filename": "WhatsApp_Image_2025-11-16_at_1.02.51_AM.jpeg",
            "userId": 5,
            "type": "jpeg",
            "uploadType": "default",
            "created_at": "2025-11-15T19:33:43.871Z",
            "shareId": null,
            "size": 350067,
            "path": "/5/WhatsApp_Image_2025-11-16_at_1.02.51_AM.jpeg"
        }]
  return (
    <div
      className="store p-6 grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] max-[768px]:grid-rows-[repeat(auto-fit,minmax(215px,0))] grid-rows-[repeat(auto-fit,minmax(245px,0))] gap-4 overflow-scroll justify-items-start bg-[var(--fileBox)] h-full"
      style={{ scrollbarWidth: "none" }}
    >
      {allFiles &&
        allFiles.map((i, index) => (
          <div
            key={index}
            className="bg-[var(--foreground)] group/file h-fit  px-3 py-3 rounded-2xl max-w-[260px] min-w-[100%] hover:translate-y-1 transition-all duration-150 ease-in-out"
          >
            <span className="flex justify-between items-center ">
              {handleFileType(i.type)}
              <button
                className={`${
                  i.type === "folder" && "hidden"
                }  group/more relative shrink-0`}
              >
                <span className="p-2 hover:bg-[var(--fileBox)] rounded-md group-hover/file:block hidden">
                  <EllipsisVertical className="w-4 h-4" />
                  </span>
                <div className="absolute top-2 right-8 bg-[var(--foreground)] rounded drop-shadow-xl  group-hover/more:block hidden  transition-all duration-150 ease-in-out">
                  <ul className=" p-3 w-fit h-fit flex flex-col gap-2 relative">
                    {actions.map((m, index) => (
                      <li
                        onClick={() => m.fn(i)}
                        key={index}
                        className={`${
                          m.name === "Delete" && "text-red-600"
                        } flex items-center gap-2 text-[var(--text)] cursor-pointer`}
                      >
                        <m.icon className="w-4 h-4" />
                        {m.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </button>
            </span>
            <span className="grid gap-3 mt-2 ">
              <h1 className={`${inter.className} !text-[14px] text-[var(--text)] whitespace-nowrap overflow-hidden text-ellipsis w-[90%]`}>{i.filename}</h1>
              <small className="text-[12px] bg-[var(--fileBox)] font-medium p-1 px-2 uppercase w-fit rounded flex items-center justify-center">
                {i.type}
              </small>
              <ul className="text-[12px] flex flex-col gap-2 !text-[#717171]">
                <li className="flex justify-between ">
                  <h2 className="text-[var(--fileText)] ">Size</h2>
                  <h2 className="text-[var(--fileText)] font-medium">
                    {handleSize(i.size)}
                  </h2>
                </li>
                <li className="flex justify-between max-[768px]:hidden">
                  <h2 className="text-[var(--fileText)] ">
                    Modified
                  </h2>
                  <h2 className="text-[var(--fileText)] font-medium">
                    {formatDate(i.created_at)}
                  </h2>
                </li>
              </ul>
            </span>
            <ul className="border-t-[1px] border-gray-300 grid grid-cols-2 mt-3 p-3 items-center gap-2 text-[12px]">
              <li
                className="flex items-center gap-2 justify-start"
                onClick={() => setClose(i)}
              >
                <Info className="w-4 h-4" /> Details
              </li>
              <li
                className="flex items-center gap-2 justify-end"
                onClick={() => DownloadFile(i)}
              >
                <Download className="w-4 h-4 shrink-0" /> Download
              </li>
            </ul>
          </div>
        ))}
    </div>
  );
};

export default GridView;
