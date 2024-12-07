// does it form a square? 
// keep track of the corner location it hits
//          x
//    x * * *
//      * * *
//      * * * x
//      x

//      x   
//      * * * x
//      * * *
//    x * * * 
//          x

// save the location it turned A, B, C 
// if A(x, y), B(y, y), C(y, x), we set the last corner to be D(x, x) count that option

// so look for this pattern where coordinates are like these  A(x, y), B(y, y), C(y, x)