const reducer = (
  state: { colorPrimary: string; colorBackground: string },
  action: {
    type: string;
    payload: string;
  }
) => {
  switch (action.type) {
    case 'SET_PRIMARY_COLOR': {
      return {
        colorPrimary: action.payload,
        colorBackground: state.colorBackground,
      };
    }
    case 'SET_BACKGROUND_COLOR': {
      return {
        colorPrimary: state.colorPrimary,
        colorBackground: action.payload,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

export default reducer;
