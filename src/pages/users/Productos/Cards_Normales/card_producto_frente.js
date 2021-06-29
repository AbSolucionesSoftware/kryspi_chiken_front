  import React, { useContext } from 'react';
import aws from '../../../../config/aws';
import DOMPurify from 'dompurify';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import './card_producto.scss';
import { formatoMexico, agregarPorcentaje } from '../../../../config/reuserFunction';
import { MenuContext } from '../../../../context/carritoContext';
import { makeStyles } from '@material-ui/styles';

const gridStyle = { width: '100%', padding: 0, marginBottom: '1.5rem' };

export default function Card_Producto_Frente(props) {
	const { productos } = props;
	const { colores } = useContext(MenuContext);

	const useStyles = makeStyles({
		background: {
			backgroundColor: colores.bodyPage.card.background,
			border: "none",
			"& .text-color": {
				color: colores.bodyPage.card.text
			}
		},
	});
	const classes = useStyles();

	if (productos.precioPromocion) {
		return (
			<div key={productos._id} className="size-col col-lg-2 col-6">
				<Link to={`/vista_producto/${productos.productoPromocion._id}`}>
					<Card.Grid hoverable style={gridStyle} className={"contenedor-card-producto-principal " + classes.background}>
						<Card
							className={"contenedor-card-body " + classes.background}
							cover={
								<div className="contenedor-imagen-oferta">
									<div className="contenedor-oferta">
										<h5 className="shadow">OFERTA</h5>
									</div>
									<div className="contenedor-imagen-producto-principal">
										<img
											className="imagen-producto-principal"
											alt="producto"
											src={aws + productos.productoPromocion.imagen}
										/>
									</div>
								</div>
							}
						>
							<div className="contenedor-titulos-productos">
								<h1 className="titulo-producto text-color">{productos.productoPromocion.nombre}</h1>
								{/* <div
								className="text-color"
									dangerouslySetInnerHTML={{
										__html: DOMPurify.sanitize(productos.productoPromocion.descripcion)
									}}
								/> */}
							</div>
							{/* <div className="contenedor-precios-productos">
								<h2 className="h5 precio-producto text-color mr-2">
									${formatoMexico(productos.productoPromocion.precio)}
								</h2>
								<h3 className="h5 precio-rebaja d-inline mr-1 text-color">
									${formatoMexico(productos.precioPromocion)}
								</h3>
								<p className="h4 porcentaje-descuento d-inline">
									{agregarPorcentaje(
										productos.precioPromocion,
										productos.productoPromocion.precio
									)}%OFF
								</p>
							</div> */}
						</Card>
					</Card.Grid>
				</Link>
			</div>
		);
	} else {
		return (
			<div key={productos._id} className="size-col col-lg-2 col-6" >
				<Link to={`/vista_producto/${productos._id}`}>
					<Card.Grid hoverable style={gridStyle} className={"frente contenedor-card-producto-principal " + classes.background}>
						<Card
							className={"frente-bajo frente contenedor-card-body " + classes.background}
							cover={
								<div className="contenedor-imagen-oferta">
									{productos.promocion.length !== 0 ? (
										productos.promocion.map((promo) => {
											return (
												<div key={promo._id} className="oferta-frente">
													<h5 className="shadow">OFERTA</h5>
													{/* <p>-{agregarPorcentaje(promo.precioPromocion, productos.precio)}%</p> */}
												</div>
											);
										})
									) : (
										<div className="d-none" />
									)}

									<div className="contenedor-imagen-producto-principal">
										<img
											className="imagen-producto-principal"
											alt="producto"
											src={aws + productos.imagen}
										/>
									</div>
								</div>
							}
						>
							<div className="container">
								<div className="row">
									<div className="col-8 col-lg-8" style={{padding: '3%', margin: '0%'}}>
										<div className="frente contenedor-titulos-productos">
											<p className="titulo-producto-frente text-color">{productos.nombre}</p>
										</div>
									</div>
									<div className="col-4 col-lg-4 cont-precios-frente" style={{padding: '3%', margin: '0%'}}>
										{!productos.promocion.length ? (
												<div className="frente contenedor-precios-productos">
													<h3 className="titulo-producto-frente precio-rebaja text-color">${formatoMexico(productos.precio)}</h3>
												</div>
										) : (
											productos.promocion.map((promo) => {
												return (
													<div className="frente contenedor-precios-productos text-color" key={promo._id}>
														<h2 className="titulo-producto-frente precio-producto  mr-2">
															${formatoMexico(productos.precio)}
														</h2>
														<h3 className="titulo-producto-frente precio-rebaja d-inline mr-1 text-color">
															${formatoMexico(promo.precioPromocion)}
														</h3>
														<p className="titulo-producto-frente porcentaje-descuento d-inline">
															{agregarPorcentaje(promo.precioPromocion, productos.precio)}%OFF
														</p>
													</div>
												);
											})
										)}
									</div>
									<div
										style={{padding: '0%', margin: '0%'}}
										className="col-12 col-lg-12 font-descrip-card-frente text-color "
									>
										<p 
											class="overflow-ellipsis description text-justify"
											dangerouslySetInnerHTML={{
												__html: DOMPurify.sanitize(productos.descripcion)
											}}
										/>
									</div>
								</div>
							</div>
							
						</Card>
					</Card.Grid>
				</Link>
			</div>
		);
	}
}