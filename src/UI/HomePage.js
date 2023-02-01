import classes from './HomePage.module.css'

const HomePage = () => {
 

    return (
        <div className={classes.HomePageWrapper}>
            <div className={classes.titleWrapper}>
                <h1>YOUR TRAININGS AND MEALS<span className={classes.titleSpan}>(soon)</span>,</h1>
                <h1>TRACK 'EM',</h1>
                <h1>SAVE 'EM,</h1>
                <h1>PROGRESS.</h1>
            </div>
            <p>You can't improve what you don't track. Start using FitPath for your personal purposes, which will make it easier to track your sports life.
            </p>
        </div>
    )
}

export default HomePage