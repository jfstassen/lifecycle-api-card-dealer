import React, { Component } from "react";
import axios from "axios";
import Card from "./Card";
import "./Deck.css"
const API_BASE_URL = "https://deckofcardsapi.com/api/deck";


class Deck extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deck: null,
            drawnCard: []
        };
        this.getCard = this.getCard.bind(this);
    }
    async componentDidMount() {
        let deck = await axios.get(`${API_BASE_URL}/new/shuffle/?deck_count=1`);
        this.setState({ deck: deck.data });
    }
    async getCard() {
        // https://deckofcardsapi.com/api/deck/<<deck_id>>/draw/?count=2
        let cardUrl = `${API_BASE_URL}/${this.state.deck.deck_id}/draw/?count=1`;
        try {
            let cardRes = await axios.get(cardUrl);
            if (!cardRes.data.success) {
                throw new Error("no card remaining");
            }
            let card = cardRes.data.cards[0];
            console.log(cardRes.data);
            this.setState(st => ({
                drawnCard: [
                    ...st.drawnCard,
                    {
                        id: card.code,
                        image: card.image,
                        name: `${card.value} of ${card.suit}`
                    }
                ]
            }));
        } catch(err){
            alert(err);
        }
    }
    render() {
        const cards = this.state.drawnCard.map(e =>
            <Card key={e.id} name={e.name} image={e.image}/>)
        return (
            <div className="Deck">
                <h1 className="Deck-title">◆ Card Dealer ◆</h1>
                <h2 className="Deck-title subtitle">◆ A little demo made with React ◆</h2>
                <button className="Deck-btn" onClick={this.getCard}>Get Card !</button>
                <div className="Deck-cardstack">
                {cards}
                </div>
            </div>
        );
    }
}

export default Deck;
