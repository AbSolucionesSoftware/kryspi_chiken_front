import React, { useCallback, useContext, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import Navegacion from '../../components/Navegacion/Navegacion';
/* import Categorias from '../Categorias/Categorias'; */
import FooterPage from '../../components/Footer/Footer';
import './layout.scss';
import { MenuContext } from '../../context/carritoContext';
// import clienteAxios from '../../config/axios';
// import jwt_decode from 'jwt-decode';
import ColorCustomizer from '../Colors/colores';
import { makeStyles } from '@material-ui/styles';
import MantenimientoImg from './Mantenimiento.png';

export default function LayoutBasic(props) {
	const { routes } = props;
	const { Content, Footer } = Layout;
	const {colores } = useContext(MenuContext);
	const production = true;

	const useStyles = makeStyles({
		background: {
			backgroundColor: colores.bodyPage.background
		},
	});
	
	const classes = useStyles();

	if(!production){
		return (
			<div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", border: "1px black solid"}}>
				<div>
					<img style={{width: "700px"}} src={MantenimientoImg} />
					<p style={{fontSize: "40px", textAlign: "center"}}>Estamos en mantenimiento</p>
					<p style={{fontSize: "30px", textAlign: "center"}}>Favor de tener paciencia.</p>
				</div>
			</div>
		)
	}

	return (
		<div className="body">
			<ColorCustomizer />
			<Layout>
				<div className={"cuerpo bg-layout " + classes.background}>
					<Layout>
						<Navegacion />
						{/* <Categorias /> */}
						<Content style={{ height: 'auto' }} className={"bg-layout " + classes.background}>
							<div className="site-layout-content flex">
								<LoadRoutes routes={routes} />
							</div>
						</Content>
					</Layout>
				</div>
				<Footer className="foot" style={{ margin: 0, padding: 0 }}>
					<FooterPage style={{ margin: 0, padding: 0 }} />
				</Footer>
			</Layout>
		</div>
	);
}

function LoadRoutes({ routes }) {
	return (
		<Switch>
			{routes.map((route, index) => (
				<Route key={index} path={route.path} exact={route.exact} component={route.component} />
			))}
		</Switch>
	);
}
