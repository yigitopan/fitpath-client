import classes from './About.module.css';
import linkedin from '../assets/linkedin.svg';
import github from '../assets/github.svg';

const About = () => {
    return (
        <div className={classes.aboutContainer}>
            <div className={classes.aboutTextWrapper}>
                <h2>Fitness Tracking App built with React.js, Node.js, Express and MongoDB using JWT</h2>
                <p>From links below you can reach the source code & my LinkedIn profile.</p>
            </div>
            
            <div className={classes.logoWrapper}>
                <div className={classes.logoContainer}>
                    <img src={github} />
                </div>

                <div className={classes.logoContainer}>
                    <img src={linkedin} />
                </div>
            </div>

            <div>
                <h4 className={classes.otherText}>My other projects:</h4>
                <div className={classes.logoWrapper}>

                    <div className={classes.logoContainer}>
                        <img src={github} />
                    </div>
                    
                    <div className={classes.logoContainer}>
                        <img src={github} />
                    </div>

                    <div className={classes.logoContainer}>
                        <img src={github} />
                    </div>

                </div>
            </div>
        </div>
    )
}
export default About