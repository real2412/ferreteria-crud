import React, {useEffect, useState, Props} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {actionCreators as actionCreatorsProducto} from '../store/Producto';
import {actionCreators as actionCreatorsCategoria} from '../store/Categoria';
import { ApplicationState } from '../store';

export default ({editar, producto}: any) => {
    const [productoID, setProductoID] = useState(producto.productoID || "")
    const [descripcion, setDescripcion] = useState(producto.descripcion || "")
    const [precio, setPrecio] = useState(producto.precio || "")
    const [stock, setStock] = useState(producto.stock || "")
    const [categoriaID, setCategoriaID] = useState(producto.categoriaID || "")
    const dispatch = useDispatch()

    const categorias = useSelector((state: ApplicationState) => {
        if(state.categorias!==undefined){
            return state.categorias.categorias
        }else{
            return []
        }
    });
    
    const isLoading = useSelector((state: ApplicationState) => {
        if(state.categorias!=undefined){
            return state.categorias.isLoading
        }else{
            return false
        }
    });

    useEffect(()=>{
        setDescripcion(producto.descripcion || "")
        setPrecio(producto.precio || "")
        setStock(producto.stock || "")
        setCategoriaID(producto.categoriaID || "")
        dispatch(actionCreatorsCategoria.requestCategorias())
    },[producto])

    const _handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let prod : {[k: string]: any} = {
            descripcion,
            precio: parseFloat(precio),
            stock: Number(stock),
            categoriaID: Number(categoriaID)
        }
        if(editar){
            prod.productoID=productoID
            console.log(prod)
            dispatch(actionCreatorsProducto.editarProducto(prod))
        }else{
            dispatch(actionCreatorsProducto.crearProducto(prod))
        }
    }

    const _handleCancelar = () => {
        dispatch(actionCreatorsProducto.emptyProducto())
    }

    const _renderCategorias = () => {
        if (isLoading){
            return (<div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div>)
        }else{
            return (
                <select 
                    className="custom-select" 
                    id="categoria_id"
                    onChange={(e:React.SyntheticEvent)=>{ 
                        let target = e.target as HTMLInputElement;
                        setCategoriaID( target.value ); 
                    }}
                >
                    <option>Seleccione...</option>
                    {
                        categorias.map((x)=>{
                            if(x.categoriaID==categoriaID){
                                return <option value={x.categoriaID} selected>{x.nombre}</option>
                            }else{
                                return <option value={x.categoriaID}>{x.nombre}</option>
                            }
                        })
                    }
                </select>
            )
        }
                
    }

    return (
        <form onSubmit={_handleSubmit}>
            <div className="form-group">
                <label htmlFor="descripcion_id">Descripcion</label>
                <input 
                    type="text"
                    className="form-control" 
                    id="descripcion_id"
                    value={descripcion}
                    placeholder="Ingrese Descripcion"
                    onChange={(e:React.SyntheticEvent)=>{ 
                        let target = e.target as HTMLInputElement;
                        setDescripcion( target.value ); 
                    }}
                />
            </div>       
            <div className="form-group">
                <label htmlFor="precio_id">Precio</label>
                <input 
                    className="form-control" 
                    id="precio_id" 
                    placeholder="Ingrese Precio"
                    value={precio}
                    type="number"
                    step="0.01"
                    onChange={(e:React.SyntheticEvent)=>{ 
                        let target = e.target as HTMLInputElement;
                        setPrecio( target.value ); 
                    }}
                />
            </div>
            <div className="form-group">
                <label htmlFor="stock_id">Stock</label>
                <input type="number"
                    className="form-control" 
                    id="stock_id"
                    value={stock} 
                    placeholder="Ingrese Stock"
                    onChange={(e:React.SyntheticEvent)=>{ 
                        let target = e.target as HTMLInputElement;
                        setStock( target.value ); 
                    }}
                />
            </div>
            <div className="form-group">
                <label htmlFor="categoria_id">Categoria</label>
                {_renderCategorias()}
            </div>
            <div className="col-auto">
                <button type="button" className="btn btn-secondary mb-2" onClick={_handleCancelar}>Cancelar</button>
                <button type="submit" className="btn btn-primary mb-2 ml-2">Guardar</button>
            </div>
        </form>
        
    )
}