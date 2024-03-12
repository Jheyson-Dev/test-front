import { Button } from "@/components/ui/button";
import { useState } from "react";
import * as XLSX from "xlsx";

export const ButonExportExcel = ({ data }) => {
  const [loading, setLoading] = useState(false);

  const download =() => {
    // setLoading(true);
    const libro = XLSX.utils.book_new();
    const hoja = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(libro, hoja, "Productos");
    setLoading(false);
    XLSX.writeFile(libro, "productos.xlsx");
  };

  return (
    <Button
      variant={"outline"}
      className="hover:bg-green-500 hover:text-white"
      onClick={download}
      // onClick={() => navigate("/admin/product/create")}
    >
      Exportar Excel
    </Button>
  );
};
