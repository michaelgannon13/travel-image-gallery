import { useStaticQuery, graphql } from "gatsby"
import "./gallery.css"
import * as React from "react"
import Img from "gatsby-image"


const useGallery = () => {
    const data = useStaticQuery(graphql`
      query {
        allFile(
          filter: { sourceInstanceName: { eq: "gallery" } }
        ) {
          nodes {
            id
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    `);
  
    return data.allFile.nodes.map(node => ({
      ...node.childImageSharp, // Note that we're spreading the childImageSharp object here
      id: node.id,
    }));
  };

  const Gallery = () => {
    const images = useGallery()
  
    return (
        <div className="gallery">
            {images.map(({ id, fluid }) => (
                <Img key={id} fluid={fluid} />
            ))}
        </div>
    )
  }

  export default Gallery