import React, { useEffect, useState } from "react"
import { HeadFC, PageProps } from "gatsby"
import BasicHeader from "components/BasicHeader"
import { getList } from "api/endpoints"
import { WishlistInfo, WishState, Wish } from "types/wishlist"
import { ApiError } from "api/utils"
import { PageContainerDiv, Main } from "components/pageContainers"
import Hero from "components/Hero"
import { Button } from "components/Button"
import styled from "styled-components"

const WishListUl = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  max-width: 600px;
  margin: 0 auto;
`

const WishItemLi = styled.li<{ $granted?: boolean }>`
  padding: 16px 0;
  opacity: ${props => props.$granted ? '0.6' : '1'};
`

const WishTitleH3 = styled.h3<{ $granted?: boolean }>`
  margin: 0 0 4px 0;
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text-primary);
  text-decoration: ${props => props.$granted ? 'line-through' : 'none'};
`

const WishTitleLink = styled.a<{ $granted?: boolean }>`
  margin: 0 0 4px 0;
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-primary);
  text-decoration: ${props => props.$granted ? 'line-through' : 'none'};

  &:hover {
    text-decoration: ${props => props.$granted ? 'line-through' : 'underline'};
  }

  &::after {
    content: ${props => props.$granted ? '""' : '" 🔗"'};
    font-size: 0.75rem;
    margin-left: 4px;
  }
`

const WishDescriptionP = styled.p<{ $granted?: boolean }>`
  margin: 0;
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  line-height: 1.4;
  text-decoration: ${props => props.$granted ? 'line-through' : 'none'};
`

const EditControls = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 0 24px;
  gap: 12px;
`

const EditModeIndicator = styled.div`
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 0.875rem;
  text-align: center;
  margin-bottom: 16px;
  animation: slideDown 0.3s ease-out;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

interface ListPageProps extends PageProps {
  params: {
    id: string
  }
}

const ListPage: React.FC<ListPageProps> = ({ params }) => {
  const [wishlist, setWishlist] = useState<WishlistInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editedWishlist, setEditedWishlist] = useState<WishlistInfo | null>(null)

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const data = await getList(params.id)
        console.log("Fetched wishlist:", data)
        setWishlist(data)
        setEditedWishlist(data) // Initialize edited state
      } catch (error) {
        if (error instanceof ApiError) {
          setError(error.message)
        } else {
          setError("Failed to load wishlist")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchWishlist()
  }, [params.id])

  if (loading) {
    return (
      <div className="landing-container">
        <BasicHeader />
        <main className="main">
          <div>Loading wishlist...</div>
        </main>
      </div>
    )
  }

  if (error) {
    return (
      <div className="landing-container">
        <BasicHeader />
        <main className="main">
          <div>Error: {error}</div>
        </main>
      </div>
    )
  }

  if (!wishlist) {
    return (
      <div className="landing-container">
        <BasicHeader />
        <main className="main">
          <div>Wishlist not found</div>
        </main>
      </div>
    )
  }

  const updateWishField = (wishIndex: number, field: keyof Wish, value: string) => {
    if (!editedWishlist) return;

    const updatedWishes = editedWishlist.wishes.map(wish =>
      wish.index === wishIndex
        ? { ...wish, [field]: value }
        : wish
    );

    setEditedWishlist({
      ...editedWishlist,
      wishes: updatedWishes
    });
  };


  return (
    <PageContainerDiv>
      <BasicHeader />
      <Main $centered={false}>
        <Hero
          title={wishlist.title}
          subtitle={wishlist.description}
        />

        <EditControls>
          <Button
            onClick={() => setIsEditMode(!isEditMode)}
            variant={isEditMode ? "secondary" : "primary"}
            size="small"
          >
            {isEditMode ? "Cancel Edit" : "Edit List"}
          </Button>
        </EditControls>

        {isEditMode && (
          <EditModeIndicator>
            Edit mode - Make your changes and save when ready
          </EditModeIndicator>
        )}

        <WishListUl>
          {wishlist.wishes
            .sort((a, b) => {
              // Sort granted items to the bottom, preserve other ordering
              if (a.state === WishState.GRANTED && b.state !== WishState.GRANTED) return 1;
              if (a.state !== WishState.GRANTED && b.state === WishState.GRANTED) return -1;
              return a.index - b.index; // Preserve original order for items with same state
            })
            .map((wish) => {
              const isGranted = wish.state === WishState.GRANTED;
              return (
                <WishItemLi key={wish.index} $granted={isGranted}>
                  {wish.link ? (
                    <WishTitleH3 $granted={isGranted}>
                      <WishTitleLink
                        href={wish.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        $granted={isGranted}
                      >
                        {wish.title}
                      </WishTitleLink>
                    </WishTitleH3>
                  ) : (
                    <WishTitleH3 $granted={isGranted}>{wish.title}</WishTitleH3>
                  )}
                  {wish.description && (
                    <WishDescriptionP $granted={isGranted}>{wish.description}</WishDescriptionP>
                  )}
                </WishItemLi>
              );
            })}
        </WishListUl>
      </Main>
    </PageContainerDiv>
  )
}

export default ListPage

export const Head: HeadFC = () => (
  <>
    <title>wishvault wishlist</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="View and manage your wishlist on wishvaults." />
  </>
)
