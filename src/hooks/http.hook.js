
export const useHttp = () => {
    // const [process, setProcess] = useState('waiting');

    const request = async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {

        // setProcess('loading');

        try {
            const response = await fetch(url, {method, body, headers});

            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json();

            return data;
        } catch(e) {
            throw e;
        }
    };

    const deleteH = async (url, method = 'DELETE', headers = {'Content-Type': 'application/json'}) => {


        try {
            const response = await fetch(url, {method, headers});

            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json();

            return data;

        } catch(e) {
            throw e;
        }
    };

    const addH = async (url, method = 'POST', body, headers = {'Content-Type': 'application/json'}) => {


        try {
            const response = await fetch(
                url, 
                {method, 
                body: JSON.stringify(body),
                headers});
            

            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json();

            return data;

        } catch(e) {
           
            throw e;
        }
    };

    return {request,
            deleteH,
            addH,
        }
}