package com.visitcard.validation;

public class LoginValidator {

    public static boolean isValid(String login) {
        if (login == null) return false;
        if (login.length() < 4 || login.length() > 20) return false;
        String pattern = "^[a-zA-Z0-9](?!.*[.]{2})[a-zA-Z0-9._]+$";
        if (!login.matches(pattern)) return false;
        return !login.startsWith(".") && !login.startsWith("_")
                && !login.endsWith(".") && !login.endsWith("_");
    }
}