import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

export const PDFCatalogo = ({ data }) => {
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
    cardContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
    },
    card: {
      width: 150,
      height: 200,
      flexDirection: "column",
      alignItems: "center",
      gap: 0,
      justifyContent: "space-between",
      padding: 10,
      borderRadius: 10,
      border: "2 solid gray",
      marginBottom: 20,
    },
    productName: {
      fontSize: 10,
      textAlign: "center",
    },
    productManufacturer: {
      fontSize: 8,
    },
    image: {
      width: 70,
      height: 70,
      backgroundColor: "red",
    },
    productPrice: {
      fontSize: 12,
      marginBottom: 10,
    },
  });

  console.log(data);
  return (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.title}>Catálogo de Productos</Text>
        <View style={styles.cardContainer}>
          {data?.map((producto, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.productName}>{producto.descripcion}</Text>
              <Text style={styles.productManufacturer}>
                {producto.marca_fabricante}
              </Text>
              <Image
                style={styles.image}
                src={
                  producto?.imagenes[1] ??
                  "https://th.bing.com/th/id/R.ed641760a1851c7f97c90d3ba5fa905e?rik=%2fo%2bpK9MvGSZdMQ&pid=ImgRaw&r=0"
                }
              />
              <Text style={styles.productPrice}>S/. {producto.precio}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};
