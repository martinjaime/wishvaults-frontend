import React, { useEffect, useState } from "react"
import { HeadFC, PageProps, navigate } from "gatsby"
import BasicHeader from "components/BasicHeader"
import { Button } from "components/Button"
import FormGroup from "components/FormGroup"
import Input from "components/Input"
import PasswordField from "components/PasswordField"
import WishlistItem, { WishlistItemData } from "components/WishlistItem"
import { createList } from "api/endpoints"
import { WishlistInfo, WishState } from "types/wishlist"

// import "styles/colors.css"
// import "styles/create.css"
import { ApiError } from "api/utils"
import { ActionsDiv, ErrorMessageP, Main as Main_, PageContainerDiv } from "components/pageContainers"
import Hero from "components/Hero"
import styled from "styled-components"

const Main = styled(Main_)`
  .create-form {
    max-width: 100%;
    margin-bottom: 48px;
  }

  .add-item-btn {
    margin-top: 8px;
    font-size: 0.9rem;
    padding: 10px 20px;
    min-height: auto;
  }
`;

const CreateListPage: React.FC<PageProps> = () => {
  const [listName, setListName] = useState("")
  const [listItems, setListItems] = useState<WishlistItemData[]>([
    { title: "", description: "", url: "" }
  ])
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)

  const genWishId = (index: number): string => {
    return `wish-${index}`
  }

  useEffect(() => {
    const lastElement = document.getElementById(genWishId(listItems.length - 1))
    if (lastElement && listItems.length > 1) {
      lastElement.scrollIntoView({ behavior: "smooth" })
      lastElement.focus()
    }
  }, [listItems.length])

  const addItem = () => {
    setListItems([...listItems, { title: "", description: "", url: "" }])
  }

  const removeItem = (index: number) => {
    // this is not necessarily correct, but it doesn't matter because we don't
    // care to keep track of which item is which
    setListItems(listItems.filter((_, i) => i !== index))
  }

  const updateItem = (index: number, field: keyof WishlistItemData, value: string) => {
    const newItems = [...listItems]
    newItems[index] = { ...newItems[index], [field]: value }
    setListItems(newItems)
  }

  const addItemOnEnterKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addItem()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const wishlistInfo: WishlistInfo = {
      title: listName,
      wishes: listItems.map((item, index) => ({
        index,
        title: item.title,
        description: item.description,
        link: item.url,
        state: WishState.PENDING // Default state
      }))
    }

    createList({ wishlistInfo, newPassword: password })
      .then((listId) => {
        console.log("Wishlist created successfully:", listId)
        navigate(`/list/${listId}`)
      })
      .catch((error) => {
        if (error instanceof ApiError) {
          console.error("Error creating wishlist:", error)
          setError(error.message)
        } else {
          console.error("Unexpected error:", error)
          setError("An unexpected error occurred while creating the wishlist. Try again later, or report it if the error persists.")
        }
      })
  }

  return (
    <PageContainerDiv>
      <BasicHeader />

      <Main>
        <Hero
          title="create a wishlist"
          subtitle="share your wishes with the world ✨"
        />
        <form onSubmit={handleSubmit} className="create-form">
          <FormGroup>
            <Input
              id="listName"
              value={listName}
              onChange={setListName}
              placeholder="my awesome wishlist"
              label="list name"
              required
            />
          </FormGroup>

          <FormGroup label="wishlist items">
            {listItems.map((item, index) => (
              <WishlistItem
                id={genWishId(index)}
                key={index}
                item={item}
                index={index}
                onUpdate={updateItem}
                onRemove={removeItem}
                onKeyDown={addItemOnEnterKey}
                canRemove={listItems.length > 1}
              />
            ))}
            <Button
              type="button"
              onClick={addItem}
              variant="secondary"
              size="small"
              className="add-item-btn"
            >
              + add item
            </Button>
          </FormGroup>

          <FormGroup>
            <PasswordField
              id="password"
              value={password}
              onChange={setPassword}
              placeholder="Enter password"
              label="password (required so you can edit later)"
              minLength={8}
              required
            />
          </FormGroup>
          {error && <ErrorMessageP>{error}</ErrorMessageP>}
          <ActionsDiv>
            <Button type="submit" variant="primary">
              create wishlist
            </Button>
          </ActionsDiv>
        </form>
      </Main>
    </PageContainerDiv>
  )
}

export default CreateListPage

export const Head: HeadFC = () => (
  <>
    <title>Create Wishlist - wishvaults</title>
    <meta
      name="description"
      content="Create and share your wishlist with wishvaults."
    />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </>
)
