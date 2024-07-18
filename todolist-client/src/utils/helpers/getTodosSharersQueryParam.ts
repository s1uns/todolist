import { store } from "../../store/store";

const getTodosSharersQueryParam = () => {
  const { selectedSharers } = store.getState().query;
  let queryParam = "";

  for (let i = 0; i < selectedSharers.length; i++) {
    queryParam += `&sharers=${selectedSharers[i]}`;
  }
  return queryParam;
};
export default getTodosSharersQueryParam;
