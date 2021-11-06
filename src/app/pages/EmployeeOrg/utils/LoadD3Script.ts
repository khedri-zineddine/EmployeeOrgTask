export const loadLMaps = (callback) => {
    const existingScript = document.getElementById('d3');
    if (!existingScript) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.17/d3.min.js';
        script.id = 'd3';
        document.body.appendChild(script);
        script.onload = () => {
            if (callback) callback();
        };
    }
    if (existingScript && callback) callback();
};