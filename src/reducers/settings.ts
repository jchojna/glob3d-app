export const initialSettings: SettingsState = {
  colorPrimary: '#DD176D',
  colorBackground: '#201A7E',
  globeOpacity: 0.85,
  autoRotate: true,
};

export const settingsReducer = (
  state: SettingsState,
  action: SettingsAction
) => {
  switch (action.type) {
    case 'changed_primary_color': {
      return {
        ...state,
        colorPrimary: action.color ?? state.colorPrimary,
      };
    }
    case 'changed_background_color': {
      return {
        ...state,
        colorBackground: action.color ?? state.colorBackground,
      };
    }
    case 'changed_globe_opacity': {
      return {
        ...state,
        globeOpacity: action.opacity ?? state.globeOpacity,
      };
    }
    case 'changed_auto_rotate': {
      return {
        ...state,
        autoRotate: action.autoRotate ?? state.autoRotate,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};
