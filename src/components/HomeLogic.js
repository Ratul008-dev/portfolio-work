function Home() {
    const images = document.querySelectorAll('.visual-container img');
    if (images.length < 3) return () => { };
    let activeIndex = 0
    const totalImages = 3

    function rotateImages() {
        activeIndex = (activeIndex + 1) % totalImages;
        images.forEach((img, idx) => {
            img.className = '';
            if (idx === activeIndex) {
                img.classList.add('photo-top')
            } else if (idx === (activeIndex + 1) % totalImages) {
                img.classList.add('photo-middle')
            } else {
                img.classList.add('photo-bottom')
            }
        })
    }
    const intervalId = setInterval(rotateImages, 3500)
    return () => clearInterval(intervalId)
}
export default Home