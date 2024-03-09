import Error "mo:base/Error";
import Types "types";
module {
    public let successMessage = {
        insert = "Sucessfully Inserted Data!";
        update = "Sucessfully updated Data!";
        delete = "Sucessfully deleted Data";
    };
    public let reject = {
        anonymous = "No Access! Anonymous User.";
        outBound = "Text OverFlow!";
        alreadyExist = "Account already Exist!";
        noAccount = "No Access ! No account Exist.";
        invalidBoard = "BoardName doesn't Exist! "; 
    };
};
