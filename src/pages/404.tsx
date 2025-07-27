import React from "react"
import { HeadFC, PageProps } from "gatsby"
import { LinkButton } from "components/Button"
import { ActionsDiv, Main, PageContainerDiv } from "components/pageContainers"
import BasicHeader from "components/BasicHeader"
import Hero from "components/Hero"

const NotFoundPage: React.FC<PageProps> = () => {
  return (
    <PageContainerDiv>
      <BasicHeader />

      <Main>
        <Hero
          title="404"
          subtitle="Page not found 🤔"
          description="The page you're looking for doesn't exist or has been moved."
        />
        <ActionsDiv>
          <LinkButton to="/" variant="primary">
            Go Home
          </LinkButton>
        </ActionsDiv>
      </Main>
    </PageContainerDiv>
  )
}

export default NotFoundPage

export const Head: HeadFC = () => (
  <>
    <title>Page Not Found - wishvaults</title>
    <meta
      name="description"
      content="The page you're looking for doesn't exist. Return to WishVaults to create and share wishlists."
    />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </>
)
