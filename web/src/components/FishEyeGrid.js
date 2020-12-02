import React, {Suspense} from 'react'

const data_cameras = [{"nombre":"Bello - I.E Jorge Eliecer Gaitan","url":"https://siata.gov.co/EntregaData1/ultimacam_FishEye_Bello.jpg"},{"nombre":"Copacabana - Ciudadela Educativa La Vida","url":"https://siata.gov.co/EntregaData1/ultimacam_FishEye_Copacabana.jpg"},{"nombre":"La Estrella - Alcaldia","url":"https://siata.gov.co/EntregaData1/ultimacam_FishEye_Alcaldia_La_Estrella.jpg"},{"nombre":"La Extrella - Canadiense","url":"https://siata.gov.co/EntregaData1/ultimacam_FishEye_La_Estrella.jpg"},{"nombre":"Girardota - SOSN","url":"https://siata.gov.co/EntregaData1/ultimacam_FishEye_Girardota.jpg"},{"nombre":"Itagui - Concejo de Itagui (1)","url":"https://siata.gov.co/EntregaData1/ultimacam_FishEye_Itagui.jpg"},{"nombre":"Medellin - Aeroparque","url":"https://siata.gov.co/EntregaData1/ultimacam_FishEye_Aeroparque.jpg"},{"nombre":"Medellin - AMVA","url":"https://siata.gov.co/EntregaData1/ultimacam_FishEye_AMVA.jpg"},{"nombre":"Medellin - Aula Ambiental","url":"https://siata.gov.co/EntregaData1/ultimacam_FishEye_Aula_Ambiental.jpg"},{"nombre":"Medellin - EAFIT","url":"https://siata.gov.co/EntregaData1/ultimacam_FishEye_EAFIT.jpg"},{"nombre":"Medellin - SIATA","url":"https://siata.gov.co/EntregaData1/ultimacam_FishEye_SIATA.jpg"},{"nombre":"Sabaneta - I.E Rafael Mejia","url":"https://siata.gov.co/EntregaData1/ultimacam_FishEye_Sabaneta.jpg"}];

const FishEyeGrid = () => {
    return(
        <Suspense fallback={<div>Loading ...</div>}>
            {data_cameras.map((c,i) => <img key={i} src={c.url} width="90px" height="90px" />)}
        </Suspense>
    )
}

export default FishEyeGrid;