export const initialSettings: SettingsState = {
  colorPrimary: '#DD176D',
  colorBackground: '#201A7E',
  globeOpacity: 0.85,
};

export const settingsReducer = (
  state: SettingsState,
  action: SettingsAction
) => {
  switch (action.type) {
    case 'changed_primary_color': {
      return {
        ...state,
        colorPrimary: action.color || initialSettings.colorPrimary,
      };
    }
    case 'changed_background_color': {
      return {
        ...state,
        colorBackground: action.color || initialSettings.colorBackground,
      };
    }
    case 'changed_globe_opacity': {
      return {
        ...state,
        globeOpacity: action.opacity || initialSettings.globeOpacity,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};
