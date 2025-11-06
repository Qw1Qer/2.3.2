import Card from '../Card/Card.tsx';


interface CatalogProps {
    products?: any[],
    loading?: boolean,
    error?: string | null,
    onCart?: (productData: any) => void
}

const Catalog = ({products, loading, error, onCart}: CatalogProps) => {
    if (error) {
        throw error;
    }

    return (
        <div className="app-catalog">
            <h2>Catalog</h2>
            <div className="catalog-list">
                {loading ? (
                    Array.from({ length: 30 }).map((_, index) => (
                        <Card
                            key={index}
                            forLoading={true}
                        />
                    ))
                ) : (
                    products?.map((product) => (
                        <Card
                            prodImg={product.image}
                            key={product.id}
                            prodName={(product.name).split('-')[0]}
                            prodWeight={(product.name).split('-')[1]}
                            prodPrice={product.price}
                            product={product}
                            onCart={onCart}
                            forLoading={false}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default Catalog;