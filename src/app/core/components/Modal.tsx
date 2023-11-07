import React from 'react'
import { ModalProps } from '../../shared/interfaces/interfaces'
import './Modal.scss'

const Modal: React.FC<ModalProps> = ({ show, onClose, character }) => {
  if (!show || !character) {
    return null
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h4 className="modal-title">{character.name}</h4>
        </div>
        <div className="modal-body">
          <img className="character-img" src={character.imageUrl} alt={character.name} />
          <h5>TV Shows</h5>
          {character.tvShows.length > 0 ? (
            <ul>
              {character.tvShows.map((show, index) => (
                <li key={index}>{show}</li>
              ))}
            </ul>
          ) : (
            <p>No TV shows available.</p>
          )}
          <h5>Video Games</h5>
          {character.videoGames.length > 0 ? (
            <ul>
              {character.videoGames.map((game, index) => (
                <li key={index}>{game}</li>
              ))}
            </ul>
          ) : (
            <p>No video games available.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Modal
