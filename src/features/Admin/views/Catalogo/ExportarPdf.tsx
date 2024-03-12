import { UseProductAll } from "../../hooks/Product/UseProductAll";
import ReactPDF from "@react-pdf/renderer";
import { PDFCatalogo } from "./PDFCatalogo";
import { useParams } from "react-router-dom";
import { PDFCatalogoTable } from "./PDFCatalogoTable";

export const ExportarPdf = () => {
  const { mode } = useParams();
  const { data } = UseProductAll();

  return (
    <div>
      <p className="text-2xl font-poppins font-semibold">
        {mode === "tabla" ? "Exportar pdf Tabla" : "Exportar pdf Galeria"}
      </p>
      <div className="flex items-center py-6 justify-between">
        <div className="flex w-full ">
          <div className="w-full ">
            {mode === "tabla" ? (
              <ReactPDF.PDFViewer className="w-full h-[600px]">
                <PDFCatalogoTable data={data} />
              </ReactPDF.PDFViewer>
            ) : (
              <ReactPDF.PDFViewer className="w-full h-[600px]">
                <PDFCatalogo data={data} />
              </ReactPDF.PDFViewer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
