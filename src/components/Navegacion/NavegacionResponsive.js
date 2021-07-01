
import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Button, Drawer, Badge, Menu} from 'antd';
import { Link } from 'react-router-dom';
import { MenuContext } from '../../context/carritoContext';
import {
	SearchOutlined,
	MenuOutlined,
	ShoppingOutlined,
	SettingOutlined,
	LogoutOutlined,
	UserOutlined,
	CloseCircleOutlined
} from '@ant-design/icons';
import jwt_decode from 'jwt-decode';
import RightMenu from './RightMenu';

import aws from '../../config/aws';
import './navegacion.scss';
// import Layout, { Header } from 'antd/lib/layout/layout';
// import Search from 'antd/lib/input/Search';
import Avatar from 'antd/lib/avatar/avatar';
import firebase from 'firebase';
import CategoriasResponsive from '../Categorias/Categorias_Responsive';
const { SubMenu } = Menu;

export default function NavegacionResponsive(props) {
    const { loading, datosContx, colores } = useContext(MenuContext);
    const {openSearch, setOpenSearch} = props;
    const useStyles = makeStyles({
        background: {
            backgroundColor: colores.navPrimary.background,
            color: colores.navPrimary.text,
            '& .ant-menu-item-selected': {
                color: `${colores.navPrimary.hoverText}!important`,
                borderBottom: `none!important`,
                /* borderBottom: ` 3px solid ${colores.navPrimary.hoverText}!important` */
            }
        },
        hover: {
            '&:hover': {
                color: `${colores.navPrimary.hoverText}!important`,
                borderBottom: `none!important`,
                /* borderBottom: ` 3px solid ${colores.navPrimary.hoverText}!important` */
            }
        }, 
        navSecondary: {
            backgroundColor: colores.navSecondary.background
        }
    });

    const classes = useStyles();
	const [ visible, setVisible ] = useState(false);
	const [ busqueda, setBusqueda ] = useState('');
	const token = localStorage.getItem('token');
	var decoded = Jwt(token);
    function Jwt(token) {
		try {
			return jwt_decode(token);
		} catch (e) {
			return null;
		}
	}
	const showDrawer = () => setVisible(true);
	const onClose = () => setVisible(false);

	function valor(e) {
		setBusqueda(e.target.value);
	}

    return (
        <>
            <div className="top-menu-responsive container">
                <div className="col-1 car-responsive d-flex justify-content-center align-items-center" style={{padding: '0%', margin: '0%'}}>
                    <Button type="link" className="barsMenu" onClick={showDrawer}>
                        <MenuOutlined className={"menu-responsivo-icon " + classes.background} style={{ fontSize: 15 }} />
                    </Button>
                </div>
                <div className="col-7" style={{padding: '0%', margin: '0%'}}>
                    {datosContx.tienda && datosContx.tienda.length > 0 ? !datosContx.tienda[0]
                        .imagenLogo ? (
                        <div className="d-none" />
                    ) : (
                        <Link to="/">
                            <div className="contenedor-logo d-flex justify-content-center align-items-center">
                                <img
                                    className="imagen-logo-principal"
                                    alt="logotipo-tienda"
                                    src={aws + datosContx.tienda[0].imagenLogo}
                                />
                            </div>
                        </Link>
                    ) : (
                        <div className="d-none" />
                    )}
                </div>
                <div className="col-4 d-flex justify-content-center align-items-center" style={{padding: '0%', margin: '0%'}}>
                    <Menu
                        className={"float-right navbar-menu-sesion a50 "  + classes.background}
                        /* theme="light" */
                        mode="horizontal"
                        defaultSelectedKeys={[ window.location.pathname ]}
                        inlineindent={0}
                    >
                        {token === '' || token === null ? (
                            <Menu.Item key="" className="nav-font-color-sesion nav-border-color a6 mt-4">
                                Inicia Sesión
                                <Link to="/entrar" />
                            </Menu.Item>
                        ) : (
                            <Menu.Item key="" className="d-none" />
                        )}
                        {token && decoded['rol'] === false ? (
                            <SubMenu
                                className="nav-font-color-sesion a6"
                                icon={
                                    !decoded.imagen && !decoded.imagenFireBase ? (
                                        <Avatar style={{ backgroundColor: '#87d068' }}>
                                            <p>{decoded.nombre.charAt(0)}</p>
                                        </Avatar>
                                    ) : decoded.imagenFireBase ? (
                                        <Avatar src={decoded.imagenFireBase} />
                                    ) : (
                                        <Avatar src={aws + decoded.imagen} />
                                    )
                                }
                            >
                                {!decoded || decoded.rol === true ? (
                                    <Menu.Item key="" className="d-none" />
                                ) : (
                                    <Menu.Item
                                        className="nav-font-color-sesion a6 font-foot-normal"
                                        key="/pedidos"
                                    >
                                        <ShoppingOutlined /> Mis ordenes
                                        <Link to="/pedidos" />
                                    </Menu.Item>
                                )}
                                <Menu.Item key="" className="nav-font-color-sesion font-foot-normal">
                                    <SettingOutlined />Mi cuenta<Link to="/perfiles" />
                                </Menu.Item>
                                <Menu.Item>
                                    <div
                                        className="text-danger centrar-nav font-foot-normal"
                                        onClick={() => {
                                            localStorage.removeItem('token');
                                            firebase.auth().signOut();
                                            setTimeout(() => {
                                                window.location.reload();
                                            }, 1000);
                                        }}
                                    >
                                        <LogoutOutlined />Cerrar Sesión
                                    </div>
                                </Menu.Item>
                            </SubMenu>
                        ) : decoded && decoded['rol'] === true ? (
                            <SubMenu
                                className="nav-font-color nav-border-color a6"
                                icon={
                                    !decoded.imagen ? (
                                        <Avatar style={{ backgroundColor: '#87d068' }}>
                                            <p>{decoded.nombre.charAt(0)}</p>
                                        </Avatar>
                                    ) : (
                                        <Avatar src={aws + decoded.imagen}>
                                            {/* <p>{decoded.nombre.charAt(0)}</p> */}
                                        </Avatar>
                                    )
                                }
                            >
                                <Menu.Item key="" className="font-foot-normal a6">
                                    <SettingOutlined />Panel de administrador<Link to="/admin" />
                                </Menu.Item>
                                <Menu.Item key="" className=" a6">
                                    <div
                                        className="text-danger centrar-nav font-foot-normal"
                                        onClick={() => {
                                            localStorage.removeItem('token');
                                            firebase.auth().signOut();
                                            setTimeout(() => {
                                                window.location.reload();
                                            }, 1000);
                                        }}
                                    >
                                        <LogoutOutlined />Cerrar Sesión
                                    </div>
                                </Menu.Item>
                            </SubMenu>
                        ) : (
                            <Menu.Item key="" className="d-none" />
                        )}
                        
                    </Menu>
                    {!decoded || decoded.rol === true ? (
                        <div className="d-none" />
                    ) : (
                        <div className="p-1">
                            <Badge count={datosContx.carritoCantidad}>
                                <Link to="/shopping_cart">
                                    <ShoppingOutlined
                                        className={"menu-responsivo-icon " + classes.background}
                                        style={{ fontSize: 26 }}
                                    />
                                </Link>
                            </Badge>
                        </div>
                    )}
                </div>

            </div>
            <div className="top-menu-responsive container">
                <div className="col-12 car-responsive d-flex justify-content-center align-items-center">
                    {/* {!decoded || decoded.rol === true ? (
                        <div className="d-none" />
                    ) : (
                        <div className="p-2">
                            <Badge count={datosContx.carritoCantidad}>
                                <Link to="/shopping_cart">
                                    <ShoppingOutlined
                                        className={"menu-responsivo-icon " + classes.background}
                                        style={{ fontSize: 28 }}
                                    />
                                </Link>
                            </Badge>
                        </div>
                    )} */}

                    {/* <div className="p-2">
                        <SearchOutlined
                            onClick={ () => setOpenSearch(!openSearch)}
                            className={"menu-responsivo-icon " + classes.background}
                            style={{ fontSize: 26 }} 
                        />
                    </div> */}
                    <CategoriasResponsive />
                </div>
            </div>
            

            <Drawer
                className="drawer-background"
                title={
                    datosContx.tienda && datosContx.tienda.length > 0 ? !datosContx.tienda[0].imagenLogo ? (
                        <div className="d-none" />
                    ) : (
                        <div className="contenedor-logo-responsivo p-1">
                            <Link to="/">
                                <img
                                    className="imagen-logo-principal"
                                    alt="logotipo-tienda"
                                    src={aws + datosContx.tienda[0].imagenLogo}
                                />
                            </Link>
                        </div>
                    ) : (
                        <div className="d-none" />
                    )
                }
                placement="left"
                closable={false}
                onClose={onClose}
                visible={visible}
            >
                <RightMenu ofertas={datosContx.ofertas} tienda={datosContx.tienda} />
            </Drawer>

           
        </>
    )
}
