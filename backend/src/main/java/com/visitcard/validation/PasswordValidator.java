package com.visitcard.validation;

public class PasswordValidator {

    public static boolean isValid(String password) {
        if (password == null) return false;
        String pattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%^&+=!()_\\-\\[\\]{}:;\"'<>?,./*~`|]).{8,}$";
        return password.matches(pattern) && !password.contains(" ");
    }
}