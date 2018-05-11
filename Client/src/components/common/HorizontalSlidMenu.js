import React from "react";
import { connect } from "react-redux";






let linkArr = [
    { label : "Tables", isSelected : true} ,  { label : "Chairs chairs charis", isSelected : false} ,  { label : "Beds", isSelected : false},
    { label : "Ricks", isSelected : false} , { label : "Morty's", isSelected : false},{ label : "Sanchez", isSelected : false},
    { label :"PinkBear", isSelected : false} ,  { label :"Raven", isSelected : false},  { label : "Penis", isSelected : false},
    
]

// const leftButton = ({onClick}) => (
//      <button onClick={onClick} className="pn-Advancer pn-Advancer_Left" type="button">
//             <svg className="pn-Advancer_Icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 551 1024">
//                 <path d="M445.44 38.183L-2.53 512l447.97 473.817 85.857-81.173-409.6-433.23v81.172l409.6-433.23L445.44 38.18z"/>
//             </svg>
//         </button>
// );
class HorizontalSlideMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            count: 6, 
            linkArr : linkArr,
            navBarTravelling: false,
            navBarTravelDirection: "",
	        navBarTravelDistance: 150,
            last_known_scroll_position: 0,
            ticking: false,
            hrNavOverFlow : "right"
            
        };
        this.setSelected = this.setSelected.bind(this);
        this.determineOverflow = this.determineOverflow.bind(this);
        this.handleNavScroll = this.handleNavScroll.bind(this);
        this.setNavOverFlow  = this.setNavOverFlow.bind(this);
        this.handleAdvanceLeftClick = this.handleAdvanceLeftClick.bind(this);
        this.handleAdvanceRightClick = this.handleAdvanceRightClick.bind(this);
        this.handleNavTransition = this.handleNavTransition.bind(this);
    }
	
    componentWillMount(){
          document.documentElement.classList.remove("no-js");
          document.documentElement.classList.add("js");
     }
    componentDidMount(){
        console.log("--- container monuted ---");
        console.log(this.refs.hrzSlideNavContents)
        this.setNavOverFlow();
        let { hrzSlideNavContents } = this.refs; 
        hrzSlideNavContents.addEventListener(
       "transitionend",this.handleNavTransition ,false);
    }
    setNavOverFlow(){
        let {hrzSlideNav, hrzSlideNavContents} = this.refs;
        this.setState(
            {hrNavOverflow : this.determineOverflow(hrzSlideNavContents, hrzSlideNav)}
        );
         hrzSlideNav
            .setAttribute( "data-overflowing",
                           this.determineOverflow(hrzSlideNavContents, hrzSlideNav)
                         )
    }
    handleNavScroll(){
        console.log("handlenavScroll")
        let { hrzSlideNav, hrzSlideNavContents } = this.refs; 
        let{ticking} = this.state;

         this.setState({last_known_scroll_position :window.scrollY});
         if (!ticking) {
             // use animation frame to get off of main thread 
            window.requestAnimationFrame(function() {
                hrzSlideNav.setAttribute("data-overflowing", this.determineOverflow(hrzSlideNavContents, hrzSlideNav ));
                this.setStae({ticking : false});
            });
        }
         this.setStae({ticking : true});
    }  
    handleAdvanceLeftClick(){
       
        let { navBarTravelDistance, navBarTravelling} = this.state;
        let { hrzSlideNav, hrzSlideNavContents } = this.refs; 
      
        // If in the middle of a move return
        if (navBarTravelling === true) {
            return;
        }
        // If we have content overflowing both sides or on the left
        if (this.determineOverflow(hrzSlideNavContents,  hrzSlideNav) === "left" || 
            this.determineOverflow(hrzSlideNavContents,  hrzSlideNav) === "both") {
            // Find how far this panel has been scrolled
            var availableScrollLeft = hrzSlideNav.scrollLeft;
            // If the space available is less than two lots of our desired distance, just move the whole amount
            // otherwise, move by the amount in the settings
            if (availableScrollLeft < navBarTravelDistance * 2) {
                hrzSlideNavContents.style.transform = "translateX(" + availableScrollLeft + "px)";
            } else {
                hrzSlideNavContents.style.transform = "translateX(" + navBarTravelDistance + "px)";
            }
            // We do want a transition (this is set in CSS) when moving so remove the class that would prevent that
            hrzSlideNavContents.classList.remove("pn-ProductNav_Contents-no-transition");
            // Update our settings
            this.setState({
                 navBarTravelDirection : "left",
                 navBarTravelling: true
            })
           
        }
        // Now update the attribute in the DOM
        hrzSlideNav.setAttribute( "data-overflowing", this.determineOverflow(hrzSlideNavContents, hrzSlideNav) );
    }
    handleAdvanceRightClick(){
        console.log("handle right");
        let { navBarTravelDistance, navBarTravelling} = this.state;
        let { hrzSlideNav, hrzSlideNavContents } = this.refs; 
      
            // If in the middle of a move return
        if (navBarTravelling === true) {
            return;
        }
        // If we have content overflowing both sides or on the right
        if (this.determineOverflow(hrzSlideNavContents, hrzSlideNav) === "right" || 
            this.determineOverflow(hrzSlideNavContents, hrzSlideNav) === "both") {
            // Get the right edge of the container and content
            var navBarRightEdge = hrzSlideNavContents.getBoundingClientRect().right;
            var navBarScrollerRightEdge = hrzSlideNav.getBoundingClientRect().right;
            // Now we know how much space we have available to scroll
            var availableScrollRight = Math.floor(navBarRightEdge - navBarScrollerRightEdge);
            // If the space available is less than two lots of our desired distance, just move the whole amount
            // otherwise, move by the amount in the settings
            if (availableScrollRight < navBarTravelDistance * 2) {
                hrzSlideNavContents.style.transform = "translateX(-" + availableScrollRight + "px)";
            } else {
                hrzSlideNavContents.style.transform = "translateX(-" + navBarTravelDistance + "px)";
            }
            // We do want a transition (this is set in CSS) when moving so remove the class that would prevent that
             hrzSlideNavContents.classList.remove("pn-ProductNav_Contents-no-transition");
            // Update our settings
            this.setState({
                 navBarTravelDirection : "right",
                 navBarTravelling: true
            })
           
        }
        // Now update the attribute in the DOM
        hrzSlideNav.setAttribute("data-overflowing", this.determineOverflow(hrzSlideNavContents, hrzSlideNav ));
    }
    handleNavTransition(){
        let { hrzSlideNav, hrzSlideNavContents } = this.refs; 
        let { navBarTravelDirection } = this.state;
       
          // get the value of the transform, apply that to the current scroll position (so get the scroll pos first) and then remove the transform
        var styleOfTransform = window.getComputedStyle( hrzSlideNavContents, null);
        var tr = styleOfTransform.getPropertyValue("-webkit-transform") || styleOfTransform.getPropertyValue("transform");
        // If there is no transition we want to default to 0 and not null
        var amount = Math.abs(parseInt(tr.split(",")[4]) || 0);
        hrzSlideNavContents.style.transform = "none";
        hrzSlideNavContents.classList.add("pn-ProductNav_Contents-no-transition");
        // Now lets set the scroll position
        if (navBarTravelDirection === "left") {
           hrzSlideNav.scrollLeft = hrzSlideNav.scrollLeft - amount;
        } else {
             hrzSlideNav.scrollLeft =  hrzSlideNav.scrollLeft + amount;
        }
        this.setState({navBarTravelling : false});
       
    }
    setSelected(label){
        let newLinkArr =this.state.linkArr.map( l => {
            if(l.label === label){
                l.isSelected = true;
            }else{
                  l.isSelected = false;
            }
            return l;
        })
        this.setState({linkArr: newLinkArr});
    } 
    determineOverflow =(content, container) => {
		var containerMetrics = container.getBoundingClientRect();
        var containerMetricsRight = Math.floor(containerMetrics.right);
        var containerMetricsLeft = Math.floor(containerMetrics.left);
        var contentMetrics = content.getBoundingClientRect();
        var contentMetricsRight = Math.floor(contentMetrics.right);
        var contentMetricsLeft = Math.floor(contentMetrics.left);
        if (containerMetricsLeft > contentMetricsLeft && containerMetricsRight < contentMetricsRight) { 
            return "both";
        } else if (contentMetricsLeft < containerMetricsLeft) {
            return "left";
        } else if (contentMetricsRight > containerMetricsRight) {
            return "right";
        } else {
            return "none";
        }
	};
 
	
    render() {
        console.log("--- render menu -----");
        console.log(this.props.tabs)
        let linkArr = this.props.tabs.map(t => {
            let {url, name } = t;
            let link = {};
            link.label = name;
            link.link = url;
            link.isSelected = true;
            return link;
        })
        let links = linkArr.map( (l, i) => 
                                    <a  
                                        key = {l.label + String(i) }
                                        className = "pn-ProductNav_Link" 
                                        aria-selected={l.isSelected}
                                        onClick = {() => this.setSelected(l.label)}
                                        > 
                                        {l.label}
                                    </a>
                               );
        console.log(links)                     
        return (
         <div className={this.props.wrapperClassName ? this.props.wrapperClassName : "pn-ProductNav_Wrapper"}>
            <nav ref="hrzSlideNav" className="pn-ProductNav"  data-overflowing="right">
                <div ref="hrzSlideNavContents"  onTransitionEnd = {() => this.handleNavTransition } className="pn-ProductNav_Contents">
                {links}
                </div>
               
            </nav>
            <button onClick={this.handleAdvanceLeftClick} className="pn-Advancer pn-Advancer_Left" type="button">
                <svg className="pn-Advancer_Icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 551 1024"><path d="M445.44 38.183L-2.53 512l447.97 473.817 85.857-81.173-409.6-433.23v81.172l409.6-433.23L445.44 38.18z"/></svg>
            </button>
            <button onClick={this.handleAdvanceRightClick} className="pn-Advancer pn-Advancer_Right" type="button">
                <svg className="pn-Advancer_Icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 551 1024"><path d="M105.56 985.817L553.53 512 105.56 38.183l-85.857 81.173 409.6 433.23v-81.172l-409.6 433.23 85.856 81.174z"/></svg>
            </button>
        </div>        
        );
    }
}

const mapStateToProps = state => {
    return {
      tabs : state.tabs
    };
  };
  
const mapDispatchToProps = dispatch => {
    return {
      addTab: tab => {
        dispatch({ type: "ADD_ITEM", url: tab.url, name: tab.name });
      }
    };
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(HorizontalSlideMenu);
  
