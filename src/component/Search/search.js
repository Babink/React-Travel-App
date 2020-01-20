import React from "react";
import { connect } from "react-redux"
import { getSingleBus } from "../Action/buses"
import { getRoutes } from "../Action/routes"
import Card from "../Card/card"

import Transfer from "../../assets/transfer.png"
import "./search.css"

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.onViewDetail = this.onViewDetail.bind(this)
        this.onBookBus = this.onBookBus.bind(this)
        this.onFromChange = this.onFromChange.bind(this)
        this.onToChange = this.onToChange.bind(this)
        this.onModify = this.onModify.bind(this)
        this.onRouteSearch = this.onRouteSearch.bind(this)

        this.state = {
            "from": this.props.match.params.from,
            "to": this.props.match.params.to,
            "modify": false
        }
    }
    componentDidMount() {
        setTimeout(() => {
            if (this.props.routes === null) {
                this.props.getRoutes({
                    "from": this.props.match.params.from,
                    "to": this.props.match.params.to
                })
                    .then(() => {
                        if (this.props.routes === null) {
                            this.props.history.push('/')
                        }
                    })
            }
        }, 2000)
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

    onViewDetail(docs) {
        this.props.getSingleBus(docs.bus_id)
        this.props.history.push(`/bus/${docs.route_from}/${docs.route_to}/detail`)
    }

    onBookBus(docs) {
        this.props.getSingleBus(docs.bus_id)
        this.props.history.push(`/bus/${docs.route_from}/${docs.route_to}/book/${JSON.parse(docs.bus_id)}`)
    }

    onModify(e) {
        e.preventDefault()

        this.setState({
            modify: !this.state.modify
        })
    }

    onRouteSearch() {
        this.props.getRoutes({
            "from": this.state.from,
            "to": this.state.to,
            "no_of_people": 0
        })
            .then(() => {
                this.props.history.push(`/search/${this.state.from}/${this.state.to}/result`)
                this.setState({
                    modify: !this.state.modify
                })
            })
    }
    render() {
        console.log(this.props.routes , "XXX")
        return (
            <div className="search_container">
                <div className="search_header">
                    <div className="search_header-1">
                        {
                            this.props.routes != null ?
                                this.props.routes.length > 1 ?
                                    <p className="search_header-1-text">
                                        <span style={{ fontWeight: "bold" }}>({this.props.routes.length})</span> Bus Found
                                        from <span style={{ fontWeight: "bold" }}> {this.props.match.params.from} </span>
                                        to <span style={{ fontWeight: "bold" }}> {this.props.match.params.to} </span>
                                    </p> :
                                    <p className="search_header-1-text">
                                        <span style={{ fontWeight: "bold" }}>({this.props.routes.length})</span> Bus Found
                                        from <span style={{ fontWeight: "bold" }}> {this.state.from} </span>
                                        to <span style={{ fontWeight: "bold" }}> {this.state.to} </span>
                                    </p>
                                : null
                        }
                    </div>

                    <div className="search_header-2">
                        {
                            !this.state.modify ?
                                <div className="search_header-2-img">
                                    <h5 className="search_header-2-img-from"> {this.state.from} </h5>
                                    <img className="search_header-2-img-icon" src={Transfer} />
                                    <h5 className="search_header-2-img-to"> {this.state.to} </h5>

                                    <button className="search_header-2-img-btn" onClick={this.onModify}> Modify </button>
                                </div> :
                                <div className='search_header-2-modify'>
                                    <input type="text"
                                        className="search_header-2-modify-from"
                                        placeholder="From" value={this.state.from} onChange={this.onFromChange} />
                                    <input type="text"
                                        className="search_header-2-modify-to"
                                        placeholder="To" value={this.state.to} onChange={this.onToChange} />

                                    <button className="search_header-2-modify-search" onClick={this.onRouteSearch}> Search </button>


                                    <button className="search_header-2-modify-cancel" onClick={this.onModify}> Cancel </button>
                                </div>
                        }
                    </div>
                </div>

                <div className="search_item">
                    {
                        this.props.routes != null ?
                            this.props.routes.map((docs) => {
                                return <Card
                                    key={docs.id}
                                    data={docs}
                                />
                            })
                            : null
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        routes: state.searched_routes != null
            ? state.searched_routes.map((docs) => {
                return docs
            })
            : null
    }
}

export default connect(mapStateToProps, { getSingleBus, getRoutes })(Search)
