import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';
import { isNull } from 'util';


// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface CategoriasState {
    isLoading: boolean;
    categorias: Categorias[];
}

export interface Categorias {
    categoriaID: number;
    nombre: string;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestCategoriasAction {
    type: 'REQUEST_CATEGORIAS';
}

interface ReceiveCategoriasAction {
    type: 'RECEIVE_CATEGORIAS';
    categorias: Categorias[];
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestCategoriasAction | ReceiveCategoriasAction ;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestCategorias: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const appState = getState();
        fetch(`api/categoria/obtener`)
            .then(response => response.json() as Promise<Categorias[]>)
            .then(data => {
                dispatch({ type: 'RECEIVE_CATEGORIAS', categorias: data });
            });

        dispatch({ type: 'REQUEST_CATEGORIAS' });

    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

 
const unloadedState: CategoriasState = { categorias: [], isLoading: false };

export const reducer: Reducer<CategoriasState> = (state: CategoriasState | undefined, incomingAction: Action): CategoriasState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_CATEGORIAS':
            return {
                categorias: state.categorias,
                isLoading: true,
            };
        case 'RECEIVE_CATEGORIAS':
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            return {
                categorias: action.categorias,
                isLoading: false,
            };
            break;
    }

    return state;
};