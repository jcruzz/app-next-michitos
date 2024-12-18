import React, { useEffect, useState } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { IVenta } from "@/app/model/VentaModel";
import { obtenerVenta } from "@/app/service/VentaService";
import { obtenerNombreDominio } from "@/app/utils/Utils";

// Estilos del comprobante
const styles = StyleSheet.create({
  page: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 40,
    paddingRight: 40,
    fontSize: 11,
    lineHeight: 1.5,
    flexDirection: "column",
    color: "#333",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #ddd",
    marginBottom: 10,
    paddingBottom: 5,
  },
  logo: { width: 100},
  title: { fontSize: 16, fontWeight: "bold", color: "#000" },
  sectionTitle: { fontSize: 12, fontWeight: "bold", marginTop: 15, marginBottom: 5 },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    padding: 5,
    borderBottom: "1px solid #ddd",
  },
  tableCell: {
    padding: 5,
    flex: 1,
    borderBottom: "1px solid #ddd",
  },
  tableCellWide: { flex: 2 },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    fontSize: 12,
    fontWeight: "bold",
  },
});


const Comprobante: React.FC<{ idCliente: number }> = ({ idCliente }) => {
  const [venta, setVenta] = useState<IVenta | null>(null);

  useEffect(() => {
    const get = async () => {
      if (!idCliente) return;

      try {
        const data = await obtenerVenta(idCliente);
        setVenta(data);
      } catch (error) {
        console.error("Error al obtener la venta:", error);
      }
    };
    get();
  }, [idCliente]);

  return (
    <Document>
      <Page style={styles.page} size="A4" orientation="portrait">
        {/* Header */}
        <View style={styles.header}>
          <Image style={styles.logo} src="/images/Dark.png" />
          <Text style={styles.title}>Comprobante de Venta</Text>
        </View>

        {/* Información del Cliente */}
        <Text style={styles.sectionTitle}>Información del Cliente</Text>
        <View>
          <View style={styles.detailRow}>
            <Text>Nombre: {venta?.cliente.persona.nombres} {venta?.cliente.persona.apellidoPaterno} {venta?.cliente.persona.apellidoMaterno}</Text>
            <Text>Contacto: {venta?.cliente.persona.numeroContacto}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text>Dirección: {venta?.cliente.persona.direccion}</Text>
            <Text>Número de Identificación: {venta?.cliente.persona.numeroIdentificacion}</Text>
          </View>
        </View>

        {/* Información de la Venta */}
        <Text style={styles.sectionTitle}>Información de la Venta</Text>
        <View>
          <View style={styles.detailRow}>
            <Text>Número de Comprobante: {venta?.numComprobante}</Text>
            <Text>Método de Pago: {obtenerNombreDominio(venta?.codMetodoPago ?? "")}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text>Tipo de Venta: {obtenerNombreDominio(venta?.codTipoVenta ?? "")}</Text>
            <Text>Fecha: {new Date().toLocaleDateString()}</Text>
          </View>
        </View>

        {/* Detalle de Productos */}
        <Text style={styles.sectionTitle}>Detalle de Productos</Text>
        <View>
          {/* Encabezado de la tabla */}
          <View style={styles.tableHeader}>
            <Text style={[styles.tableCell, styles.tableCellWide]}>Producto</Text>
            <Text style={styles.tableCell}>Cantidad</Text>
            <Text style={styles.tableCell}>Precio Unitario</Text>
            <Text style={styles.tableCell}>Subtotal</Text>
          </View>

          {/* Filas de la tabla */}
          {venta?.detalles.map((detalle: any, index: number) => (
            <View key={index} style={{ flexDirection: "row" }}>
              <Text style={[styles.tableCell, styles.tableCellWide]}>
                {detalle.producto.nombreProducto}
              </Text>
              <Text style={styles.tableCell}>{detalle.cantidad}</Text>
              <Text style={styles.tableCell}>
                Bs. {detalle.producto.precioProducto.toFixed(2)}
              </Text>
              <Text style={styles.tableCell}>
                Bs. {(detalle.cantidad * detalle.producto.precioProducto).toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        {/* Total */}
        <View style={styles.totalRow}>
          <Text>Total</Text>
          <Text>Bs. {venta?.total.toFixed(2)}</Text>
        </View>

        {/* Información del Usuario */}
        <Text style={styles.sectionTitle}>Atendido por</Text>
        <View>
          <Text>Usuario: {venta?.user.username}</Text>
          <Text>Email: {venta?.user.emailUsuario}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default Comprobante;
