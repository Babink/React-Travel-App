import React from "react";
import { connect } from "react-redux"
import { getAllRoutes } from "../Action/routes"
import { getSingleBus } from "../Action/buses"

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

class Tour extends React.Component {
    componentWillMount() {
        this.props.getAllRoutes();
    }

    onBookNow(docs) {
        this.props.getSingleBus(docs.bus_id)
        this.props.history.push(`/bus/${docs.route_from}/${docs.route_to}/book/${JSON.parse(docs.bus_id)}`)
    }

    onViewDetail(docs) {
        this.props.getSingleBus(docs.bus_id)
        this.props.history.push(`/bus/${docs.route_from}/${docs.route_to}/detail`)
    }
    render() {
        return (
            <div className="container">
                <div className="col">
                    {/* {
                        this.props.allRoutes != null ?
                            this.props.allRoutes.map((docs) => {
                                return (
                                    <Card className={useStyles.card}>
                                        <CardContent>
                                            <Typography className={useStyles.title} color="textSecondary" gutterBottom>
                                                {docs.route_from} To {docs.route_to}
                                            </Typography>
                                            <Typography variant="h5" component="h2">
                                                Highway: {docs.highway}
                                            </Typography>
                                            <Typography className={useStyles.pos} color="textSecondary">
                                                {
                                                    docs.bus_id ?
                                                        <p style={{ color: "green" }}> Bus is Available </p> :
                                                        <p style={{ color: "red" }}> Bus is not Available </p>
                                                }
                                            </Typography>
                                            <Typography variant="body2" component="p">
                                                Price
                                            </Typography>
                                            <Typography variant="body2" component="p">
                                                AMENITIES
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small" onClick={() => this.onBookNow(docs)}>Book Now</Button>
                                            <Button size="small" onClick={() => this.onViewDetail(docs)}>View Details</Button>
                                        </CardActions>
                                    </Card>
                                )
                            }) : <p> No Routes Available </p>
                    } */}
                    This will be tour page
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        allRoutes: state.GetAllRoutes != null ?
            state.GetAllRoutes.map((docs) => {
                return docs
            }) : null
    }
}

export default connect(mapStateToProps, { getAllRoutes, getSingleBus })(Tour)