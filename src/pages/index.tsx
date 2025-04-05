// import Head from "next/head";
// import Image from "next/image";
// import { Geist, Geist_Mono } from "next/font/google";
// import styles from "@/styles/Home.module.css";

import { useQuery } from "@tanstack/react-query";
import { AgGridReact } from "ag-grid-react";
import { fetchProduct } from "./api/productApi";
import { useState } from "react";
import { AllCommunityModule, ColDef, ModuleRegistry } from "ag-grid-community";
import PostForm from "@/Components/PostForm/PostForm";

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

export default function Home() {
  const [editPost, setEditPost] = useState(null);

  //recent id component with new text
  const recentId = (params) => {
    const id = params.value;
    if (id >= 8 && id <= 10) {
      return (
        <div style={{ display: "flex", alignItems: "center" }}>
          <p style={{ margin: 0 }}>{id}</p>
          <p style={{ color: "green", margin: "0px 2px" }}>New</p>
        </div>
      );
    }
    return <p style={{ margin: 0 }}>{id}</p>;
  };

  //for reading data
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchProduct,
  });

  //for updating data

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs] = useState<
    ColDef<{
      userId: number;
      id: number;
      title: string;
      body: string;
      edit: string;
      delete: string;
    }>[]
  >([
    { field: "userId" },
    { field: "id", cellRenderer: recentId },
    { field: "title" },
    { field: "body" },
    {
      field: "edit",
      cellRenderer: (params) => (
        <button onClick={() => setEditPost(params.data)}>Edit</button>
      ),
    },
    { field: "delete", cellRenderer: () => <button>Delete</button> },
  ]);

  //setting default column definitions
  const defaultColDef = {
    flex: 1, // Flex property to make columns responsive
  };

  return (
    <>
      <div style={{ height: 500 }}>
        {isLoading && <p>Loading...</p>}
        {isError && <p>{error.message}</p>}
        {data && data.length > 0 && (
          <AgGridReact
            rowData={data}
            columnDefs={colDefs}
            defaultColDef={defaultColDef}
            pagination={true}
            paginationPageSize={11}
          />
        )}
        <PostForm editPost={editPost} setEditPost={setEditPost} />
      </div>
    </>
  );
}
