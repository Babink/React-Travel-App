import React from "react";
import "./home.css";
import Ticket from "../../assets/ticket.svg"
import Luggage from "../../assets/luggage.svg"
import Heart from "../../assets/heart.svg"
import { connect } from "react-redux"
import { getRoutes } from "../Action/routes"

import Email from "../../assets/mail.svg"
import Phone from "../../assets/phone.svg"

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.onFromChange = this.onFromChange.bind(this)
        this.onToChange = this.onToChange.bind(this)
        this.onPeopleChange = this.onPeopleChange.bind(this)
        this.onDateChange = this.onDateChange.bind(this)
        this.onSearch = this.onSearch.bind(this)
        this.onItemClick = this.onItemClick.bind(this)

        this.state = {
            items: [
                { icon: Ticket, title: "Easy as 1, 2, 3", des: "Choose the cheapest and fastest routes" },
                { icon: Luggage, title: "Get there your way", des: "Enjoy travelling by bus across Nepal" },
                { icon: Heart, title: "Every time, anywhere", des: "Because your trip doesn't end with a ticket, we’re here for you all the way" }
            ],
            tours: [
                { image: "https://friendsofvinusa.files.wordpress.com/2014/10/baglung-bazar.jpg", name: "Baglung", price: "Rs.1500" },
                { image: "https://r-cf.bstatic.com/images/hotel/max1024x768/188/188582694.jpg", name: "Pokhara", price: "Rs.2000" },
                { image: "https://aerolinatours.com/pagegallery/antudanda-illam-sunrise-trek70.jpg", name: "Illam", price: "Rs.3000" },
            ],
            from: "",
            to: "",
            date: "",
            people: "",
            error: ""
        }
    }

    onFromChange(e) {
        this.setState({
            from: e.target.value
        })
    }

    onToChange(e) {
        this.setState({
            to: e.target.value
        })
    }

    onDateChange(e) {
        this.setState({
            date: e.target.value
        })
    }

    onPeopleChange(e) {
        this.setState({
            people: e.target.value
        })
    }

    onSearch() {
        const { from, to, date, people } = this.state

        if (from && to && people) {
            this.props.getRoutes({
                "from": from,
                "to": to,
                "no_of_people": people
            })
                .then(() => {
                    this.props.history.push(`search/${from}/${to}/result`)
                })

            this.setState({
                from: "",
                to: "",
                date: "",
                people: ""
            })
        }
        else {
            this.setState({
                error: "Please Fill All Field"
            })
        }

    }

    onItemClick(docs) {
        const from = "kathmandu"
        const to = docs.name.toLowerCase()

        this.props.getRoutes({
            "from": from,
            "to": to,
            "no_of_people": 1
        })
            .then(() => {
                this.props.history.push(`search/${from}/${to}/result`)
            })
    }


    render() {
        return (
            <div className="home-container">
                <div className="home-img">
                    <div className="home-card">
                        <input type="text" placeholder="From:" className="from" value={this.state.from} onChange={this.onFromChange} />
                        <input type="text" placeholder="To: " className="to" value={this.state.to} onChange={this.onToChange} />
                        <input type="date" placeholder="Date:" className="date" value={this.state.date} onChange={this.onDateChange} />
                        <input type="number" placeholder="No.of People" className="people" value={this.state.people} onChange={this.onPeopleChange} />

                        <button className="search" onClick={this.onSearch}> Search </button>
                    </div>
                </div>
                <div className="home-des">
                    {
                        this.state.items.map((docs, i) => {
                            return (
                                <div className={`home-des-${i + 1}`}>
                                    <img src={docs.icon} className="home-des-icon" />
                                    <p className="home-des-title"> {docs.title} </p>
                                    <p className="home-des-des"> {docs.des} </p>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="home-top">
                    <h4 className="home-top-title"> Top Trip from Kathmandu </h4>

                    <div className="home-top-container">
                        {
                            this.state.tours.map((docs) => {
                                return (
                                    <div className="top-card" onClick={() => this.onItemClick(docs)}>
                                        <img className="top-card-img" src={docs.image} />
                                        <p className="top-card-name"> {docs.name} </p>
                                        <p className="top-card-price"> {docs.price} </p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="about-us">
                    <h4 className="about-us-title"> Buses in one search </h4>
                    <div className="about-us-content">
                        <h4> About us </h4>
                        <p>
                            We simplify the travel planning process so that you can save time—and money! </p>

                        <h4> Book your next trip with us </h4>
                        <p>
                            1. Enter your departure and arrival destinations and travel dates <br></br>
                            2. Compare the bus routes available between the two destinations<br></br>
                            3. Choose the best route for you and book your tickets on our website<br></br>
                            4. Either print your ticket or download your mobile ticket<br></br>
                            <br></br>
                            Have a great trip!
                        </p>

                        <h4> Why us? </h4>
                        <p>
                            1. We’ve worked out all the complicated bits so you don’t have to! Instead, you have more time to plan the fun part of your journey!<br></br>
                            2. Our technology sifts through all the data to find you the best options—in just a couple of seconds—for your requirements. <br></br>
                            3. You can count on us. We offer customer service and our team is happy to help with any issues. Spend less time planning your travels and more time experiencing them.
                        </p>
                    </div>
                </div>

                <div className="contact-us">
                    <h4 className="contact-us-title"> contact us via </h4>
                    <div className="contact-us-icon">
                        <div className="contact-us-icon-1">
                            <img className="contact-us_icon" src={Email} />
                            <p className="contact-us_text"> sujankhadgi50@gmail.com </p>
                        </div>

                        <div className="contact-us-icon-2">
                            <img className="contact-us_icon" src={Phone} />
                            <p className="contact-us_text"> +977-9880066991 </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, { getRoutes })(Home);