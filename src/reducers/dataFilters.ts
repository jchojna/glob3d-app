export const initialDataFilters = {
  dataset: 'cities',
  queryLimit: 100,
  allCountries: [],
  selectedCountries: [],
};

export const dataFiltersReducer = (
  state: DataFiltersState,
  action: DataFiltersAction
) => {
  switch (action.type) {
    case 'changed_dataset': {
      return {
        ...state,
        dataset: action.dataset ?? state.dataset,
      };
    }
    case 'changed_query_limit': {
      return {
        ...state,
        queryLimit: action.queryLimit ?? state.queryLimit,
      };
    }
    case 'changed_all_countries': {
      return {
        ...state,
        allCountries: action.countries ?? state.allCountries,
      };
    }
    case 'changed_selected_countries': {
      return {
        ...state,
        selectedCountries: action.countries ?? state.selectedCountries,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};
