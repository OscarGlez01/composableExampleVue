import axios from 'axios' // Puedes usar otros metodos cómo fetch API o 
import { ref } from 'vue'

export const useGetData = () => {
    const dataResponse =ref(null);
    const error = ref(null);
    const loading = ref(true);

    const getData = async(url) => {
        loading.value = true;
        try {
            const res = await axios.get(url);
            dataResponse.value = res.data;
        } catch (e) {
            error.value = e; 
        } finally {
            loading.value = false;
        }
    };

    return { dataResponse, error, loading, getData };
}