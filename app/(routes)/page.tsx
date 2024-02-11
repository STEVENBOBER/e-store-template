import { Container } from "@/components/ui/container";
import { Billboards } from "@/components/ui/billboard";
import { ProductList } from "@/components/product-list";
import { getBillboard } from "@/actions/get-billboard";
import { getProducts } from "@/actions/get-products";

export const revalidate = 0;

const HomePage = async () => {
  const products = await getProducts({ isFeatured: true })
  const billboard = await getBillboard('d817a4d2-b178-4be6-841c-03da6586f78b')


  return (
    <Container>
      <div className="space-y-10 pb-10" >
        <Billboards
          data={billboard}
        />
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductList title='Featured' items={products} />
        </div>
      </div>
    </Container>
  )
}

export default HomePage;