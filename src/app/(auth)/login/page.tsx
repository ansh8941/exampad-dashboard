"use client";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import NextLink from "next/link";
import { Link, Stack, Checkbox, TextField, IconButton, InputAdornment, FormControlLabel } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Iconify from "@/components/Iconify";
import { useLoginMutation } from "@/redux/features/auth/api";
import { QueryErrorTypes } from "@/types/globalInterface";
// ----------------------------------------------------------------------

export default function Login() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [login, { isSuccess, isError, isLoading, error }] = useLoginMutation();
  const QueryError = error as QueryErrorTypes;
  useEffect(() => {
    if (isSuccess) {
      toast.success("User loggedin successfully");
      router.push('/dashboard');
    }

    if (isError) {
      console.log(QueryError);

      toast.error(QueryError?.message, {
        position: "top-right",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Email must be a valid email address").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },
    validationSchema: LoginSchema,
    onSubmit: async () => {
      const { email, password } = values;
      await login({ email, password });
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <TextField
          fullWidth
          autoComplete="email"
          type="text"
          label="Email"
          {...getFieldProps("email")}
          error={Boolean(touched.email && errors.email)}
          helperText={touched.email && errors.email}
        />

        <TextField
          fullWidth
          autoComplete="current-password"
          type={showPassword ? "text" : "password"}
          label="Password"
          {...getFieldProps("password")}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassword} edge="end">
                  <Iconify icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          error={Boolean(touched.password && errors.password)}
          helperText={touched.password && errors.password}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <FormControlLabel control={<Checkbox {...getFieldProps("remember")} checked={values.remember} />} label="Remember me" />

        <Link component={NextLink} variant="subtitle2" href="#" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isLoading || isSubmitting}>
        Login
      </LoadingButton>
    </form>
  );
}
