import React, { useContext } from 'react';

import {withRouter } from 'react-router-dom';
import { MenuContext } from '../../../context/carritoContext';
import Banner_Promocionales from './bannerPromocionales';

function Consulta_Banners(props) {
	const { datosContx } = useContext(MenuContext);

    return (
        <div className="container-fluid" style={{padding: '1%'}}>
			 <Banner_Promocionales banner={datosContx.banners}/>
        </div>
    )
}

export default withRouter(Consulta_Banners);

