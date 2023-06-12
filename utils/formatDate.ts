

export const formatearFecha = (fecha:string) =>{
    let fechaString = fecha?.split('T')[0]
    let array = fechaString?.split("-")
    const nuevaFecha = new Date(array?.toString())
    const opciones: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
    return nuevaFecha.toLocaleDateString('es-ES', opciones)

    
}