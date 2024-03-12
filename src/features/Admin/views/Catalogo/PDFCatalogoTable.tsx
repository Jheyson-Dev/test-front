import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

export const PDFCatalogoTable = ({ data }) => {
  console.log(data);
  const styles = StyleSheet.create({
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
    },
    title: {
      fontSize: 16,
      textAlign: "center",
      marginBottom: 20,
    },
    table: {
      display: "flex",
      width: "auto",
      borderStyle: "solid",
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 1,
      borderLeftWidth: 0,
    },
    tableRow: {
      flexDirection: "row",
      borderBottomColor: "#bbb",
      borderBottomWidth: 1,
      alignItems: "center",
      height: 50,
      fontStyle: "bold",
    },
    rowHeader: {
      flexDirection: "row",
      borderBottomColor: "#bbb",
      borderBottomWidth: 1,
      alignItems: "center",
      height: 50,
      fontStyle: "bold",
      backgroundColor: "#f2f2f2",
    },
    tableCol: {
      width: "20%",
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    tableCell: {
      margin: "auto",
      // margin: 5,
      fontSize: 10,
    },
    cellHeader: {
      margin: "auto",
      fontSize: 12,
      fontWeight: "extrabold",
    },
    colImage: {
      width: "20%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    image: {
      width: 40,
      height: 40,
    },
  });

  return (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.title}>Catálogo de Productos</Text>
        <View style={styles.table}>
          <View style={styles.rowHeader}>
            <View style={styles.tableCol}>
              <Text style={styles.cellHeader}>Codigo Interno</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.cellHeader}>Producto</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.cellHeader}>Descripcion</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.cellHeader}>Imagen</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.cellHeader}>Precio</Text>
            </View>
          </View>
          {data?.map((producto, index) => (
            <View key={index} style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{producto.codigo_interno}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{producto.nombre_producto}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{producto.descripcion}</Text>
              </View>
              <View style={styles.colImage}>
                <Image
                  style={styles.image}
                  src={
                    producto?.imagenes[1] ??
                    "https://th.bing.com/th/id/R.ed641760a1851c7f97c90d3ba5fa905e?rik=%2fo%2bpK9MvGSZdMQ&pid=ImgRaw&r=0"
                  }
                />
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>S/. {producto.precio}</Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};
