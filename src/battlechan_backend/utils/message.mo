import Error "mo:base/Error";
import Types "types";
module {

    //     public let insert_message : Types.SucessMessage = #inserted("Sucessfully Inserted Data !");
    //     public let update_message : Types.SucessMessage = #update("Sucessfully Updated Data!");
    //     public let delete_message : Types.SucessMessage = #delete("Sucessfully Delete Data!");

    public let successMessage = {
        insert = "Sucessfully Inserted Data!";
        update = "Sucessfully updated Data!";
        delete = "Sucessfully deleted Data";
    };
    public let reject = {
        anonymous = "No Access! Anonymous User.";
        outBound = "Text OverFlow!";
        alreadyExist = "Account already Exist!";
    };

};
