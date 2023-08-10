import { createBrowserRouter } from "react-router-dom";

import { ProtectedRoute } from "./ProtectedRoute";
import { AppRoutes } from "./routes";

import { CreateProfilePage, LoginPage } from "@modules/auth";
import { HomePage } from "@modules/home/";
import { PaymentsIndex } from "@/modules/payments";
import { GuestsIndex } from "@/modules/guests";
import {
  PurchaseBestIdeas,
  PurchasesIndex,
  SinglePurchasePage,
  ManualProductList,
} from "@/modules/purchases";

import { WeddingProfileIndex } from "@/modules/administrative/wedding-profile";
import { RegionSettingsIndex } from "@/modules/administrative/region-settings";
import { DesignSettingsIndex } from "@/modules/administrative/design-settings";

import { SignleTaskPage } from "@/modules/tasks/pages/SignleTaskPage";
import { PostsIndex, SinglePost } from "@/modules/posts";
import { SingleVendor, VendorsIndex, VendorsList } from "@/modules/vendors";

export const router = createBrowserRouter([
  {
    path: AppRoutes.LOGIN,
    element: <LoginPage />,
  },
  {
    path: AppRoutes.CREATE_PROFILE,
    element: <CreateProfilePage />,
  },
  {
    path: AppRoutes.ROOT,
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: AppRoutes.SINGLE_TASK,
    element: (
      <ProtectedRoute>
        <SignleTaskPage />
      </ProtectedRoute>
    ),
  },
  {
    path: AppRoutes.PAYMENTS_LIST,
    element: (
      <ProtectedRoute>
        <PaymentsIndex />
      </ProtectedRoute>
    ),
  },
  {
    path: AppRoutes.GUESTS_LIST,
    element: (
      <ProtectedRoute>
        <GuestsIndex />
      </ProtectedRoute>
    ),
  },
  {
    path: AppRoutes.PURCHASES_LIST,
    element: (
      <ProtectedRoute>
        <PurchasesIndex />
      </ProtectedRoute>
    ),
  },
  {
    path: `${AppRoutes.PURCHASES_BEST_IDEAS}/:id`,
    element: (
      <ProtectedRoute>
        <PurchaseBestIdeas />
      </ProtectedRoute>
    ),
  },
  {
    path: `${AppRoutes.PURCHASES_BEST_IDEAS}`,
    element: (
      <ProtectedRoute>
        <SinglePurchasePage />
      </ProtectedRoute>
    ),
  },
  {
    path: `${AppRoutes.MANUAL_PURCHAES_LIST}`,
    element: (
      <ProtectedRoute>
        <ManualProductList />
      </ProtectedRoute>
    ),
  },
  {
    path: `${AppRoutes.WEDDING_PROFILE}`,
    element: (
      <ProtectedRoute>
        <WeddingProfileIndex />
      </ProtectedRoute>
    ),
  },
  {
    path: `${AppRoutes.REGION_SETTINGS}`,
    element: (
      <ProtectedRoute>
        <RegionSettingsIndex />
      </ProtectedRoute>
    ),
  },
  {
    path: `${AppRoutes.DESIGN_SETTINGS}`,
    element: (
      <ProtectedRoute>
        <DesignSettingsIndex />
      </ProtectedRoute>
    ),
  },
  {
    path: `${AppRoutes.POSTS}`,
    element: (
      <ProtectedRoute>
        <PostsIndex />
      </ProtectedRoute>
    ),
  },
  {
    path: `${AppRoutes.POST}`,
    element: (
      <ProtectedRoute>
        <SinglePost />
      </ProtectedRoute>
    ),
  },
  {
    path: `${AppRoutes.VENDORS}`,
    element: (
      <ProtectedRoute>
        <VendorsIndex />
      </ProtectedRoute>
    ),
  },
  {
    path: `${AppRoutes.SEARCH_VENDORS}`,
    element: (
      <ProtectedRoute>
        <VendorsList />
      </ProtectedRoute>
    ),
  },
  {
    path: `${AppRoutes.SINGLE_VENDOR}`,
    element: (
      <ProtectedRoute>
        <SingleVendor />
      </ProtectedRoute>
    ),
  },
]);
