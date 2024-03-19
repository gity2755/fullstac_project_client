import './homePage.css'
import ImageSlider from "./imageSlider";
const HomePage = () => {
    let images = ['./homePageImg.webp', './WB3CP4916E,WB3CP4916SK,WB3CP4916D,WB3CP4882T.jpg', './WB3CP4916E.jpg', './WB3CP4921,WB3CP4921D,WB3CP4921B.jpg', './WB3CY2153BG,WB3CY2153BB (7).jpg']

    return (<><div id="slider">
        <ImageSlider images={images} />
        
<body>
    <header>
        <h1>The Kids Shoppe</h1>
        <p>Crafting Exceptional Children's Boutique Clothing</p>
    </header>

    <section>
        <h2>The Creative Journey</h2>
        <p>At The Kids Shoppe, we specialize in creating boutique children's clothing to ensure your little ones experience perfect and comfortable attire. With our unique clothing creations, we offer high-quality European craftsmanship along with flexibility and comfort that both kids and parents love.</p>

        <h2>Material Selection</h2>
        <p>We prioritize maintaining the quality of materials. Drawing on our European manufacturing background, we choose top-quality materials by leaps and bounds, providing your children with garments that pass the highest quality standards.</p>

        <h2>Cutting and Sewing</h2>
        <p>After the meticulous selection of materials, the fabric pieces are brought to our workshop, where cutting and sewing take place with professional craftsmanship. Our expertise and attention to detail ensure flexibility and a perfect look.</p>

        <h2>Finishing and Quality</h2>
        <p>Following the sewing, each garment undergoes finishing and quality processes. Logos, labels, and every additional detail are added with precision to ensure that the clothing arrives in the best possible condition.</p>

        <h2>Testing and Distribution</h2>
        <p>Upon completion of production, the garments undergo rigorous quality checks to ensure they meet the highest standards. After testing, they are distributed and made available in our store.</p>

        <h2>Welcome to The Kids Shoppe</h2>
        <p>In every item you choose, you receive handcrafted production, exceptional quality, and designs that both children and parents adore. Explore our new collection and immerse yourself in the world of children's fashion like never before. The Kids Shoppe - because beautiful children deserve beautiful clothing!</p>
    </section>
</body> </div></>
    );
}

export default HomePage;