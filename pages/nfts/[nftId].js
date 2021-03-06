import Header from '../../components/Header'
import { useEffect, useMemo, useState } from 'react'
import { useWeb3 } from '@3rdweb/hooks'
import { ThirdwebSDK } from '@3rdweb/sdk'
import { useRouter } from 'next/router'
import GeneralDetails from '../../components/nft/GeneralDetails'
import NFTImage from '../../components/nft/NFTImage'
import ItemActivity from '../../components/nft/ItemActivity '
import Purchase from '../../components/nft/Purchase'


const style = {
    wrapper: `flex flex-col items-center container-lg text-[#e5e8eb]`,
    container: `container p-6`,
    topContent: `flex`,
    nftImgContainer: `flex-1 mr-4`,
    detailsContainer: `flex-[2] ml-4`,
}

const NFt = () => {
    const { provider } = useWeb3()
    const [selectedNft, setSelectedNft] = useState()
    const [listings, setListings] = useState([])
    const router = useRouter()
    

    const nftModule = useMemo(() => {
        if (!provider) return

        const sdk = new ThirdwebSDK(
            provider.getSigner()
        )
        return sdk.getNFTModule(router.query.collectionId)
    }, [provider])

    // get all NFTs in the collection
    useEffect(() => {
        if (!nftModule) return
            ; (async () => {
                const nfts = await nftModule.getAll()

                const selectedNftItem = nfts.find((nft) => nft.id === router.query.nftId)

                setSelectedNft(selectedNftItem)
            })()
    }, [nftModule])

    const marketPlaceModule = useMemo(() => {
        if (!provider) return

        const sdk = new ThirdwebSDK(
            provider.getSigner()
        )

        return sdk.getMarketplaceModule(
            '0x91543fA56fA042a8cD2313Ee7D83B64E0Fa85B8C'
        )
    }, [provider])

    useEffect(() => {
        if (!marketPlaceModule) return
            ; (async () => {
                setListings(await marketPlaceModule.getAllListings())
            })()
    }, [marketPlaceModule])


   return (
        <div>
          <Header />
          <div className={style.wrapper}>
            <div className={style.container}>
              <div className={style.topContent}>
                <div className={style.nftImgContainer}>
                  <NFTImage selectedNft={selectedNft} />
                </div>
                <div className={style.detailsContainer}>
                  <GeneralDetails  collectionId={router.query.collectionId} selectedNft={selectedNft} />
                  <Purchase
                    isListed={router.query.isListed}
                    selectedNft={selectedNft}
                    listings={listings}
                    marketPlaceModule={marketPlaceModule}
                  />
                </div>
              </div>
              <ItemActivity />
            </div>
          </div>
        </div>
      )
}

export default NFt